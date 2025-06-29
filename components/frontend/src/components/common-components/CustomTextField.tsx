import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    border: '1px solid',
    backgroundColor: '#F3F6F9',
    borderColor: '#E0E3E7',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
      borderRadius: 4,
    }),
  },
}));

