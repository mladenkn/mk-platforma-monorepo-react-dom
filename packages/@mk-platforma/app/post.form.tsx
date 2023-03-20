import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

export type Post_base = {
  id: number
  label: string
  description: string
  location: string
  photos: string[]
  phoneNumber: string
}

const PostForm: React.FC = () => {
  const { control, handleSubmit } = useForm<Post_base>();
  const onSubmit = handleSubmit((data) => console.log(JSON.stringify(data)));

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: 400, maxWidth: 700 }}>
      <Controller
        render={() =>
          <TextField
            label="Label"
            type="text"
            variant="outlined"
            sx={{ backgroundColor: '#f8f8f8', marginBottom: '20px' }}
          />
        }
        control={control}
        name="label"
      />
      <Controller
        render={() =>
          <TextField
            label="Description"
            type="text"
            variant="outlined"
            sx={{ backgroundColor: '#f8f8f8', marginBottom: '20px' }}
          />
        }
        control={control}
        name="description"
      />
      <Controller
        render={() =>
          <TextField
            label="Location"
            type="text"
            variant="outlined"
            sx={{ backgroundColor: '#f8f8f8', marginBottom: '20px' }}
          />
        }
        control={control}
        name="location"
      />
      <Controller
        render={() =>
          <TextField
            label="Photos"
            type="text"
            variant="outlined"
            sx={{ backgroundColor: '#f8f8f8', marginBottom: '20px' }}
          />
        }
        control={control}
        name="photos"
      />
      <Controller
        render={() =>
          <TextField
            label="Phone Number"
            type="text"
            variant="outlined"
            sx={{ backgroundColor: '#f8f8f8', marginBottom: '20px' }}
          />
        }
        control={control}
        name="phoneNumber"
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
}

export default PostForm;