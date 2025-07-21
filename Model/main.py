from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from resume_parser.ingest_resume import ingest_resume
from QA_Bot.query_resume import load_qa_chain
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Allow CORS for local development (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["4000"],  # Or specify your frontend/backend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

# Get the absolute path to the backend uploads directory
UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../components/backend/uploads'))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/process_resume/")
async def process_resume(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    print(f"Saving file to: {file_location}")
    with open(file_location, "wb") as f:
        f.write(await file.read())
    try:
        # Process the resume and get result
        ingest_resume(file_location)

        # Prepare the question for the model
        question = (
            "Summarize the content of this resume. "
            "Identify and list out the candidate's strengths. "
            "Also, mention good-to-have skills or experiences that could help land a better job."
        )

        # Load QA chain/model and get the answer
        qa_chain = load_qa_chain()
        answer = qa_chain(question)

        print("Answer from model:", answer)        
        return JSONResponse(content={
            "message": "Resume processed!",
            "summary_answer": answer
        })
    except Exception as e:
        return JSONResponse(content={"message": "Processing failed.", "error": str(e)}, status_code=500)

@app.post("/ask/")
async def ask_question(question: str):
    qa_chain = load_qa_chain()
    try:
        answer = qa_chain(question)
        return JSONResponse(content={"answer": answer})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)