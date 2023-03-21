import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@material-ui/core'

interface FormInputs {
  label: string
  description: string
  location: string
  photos: string[]
  phoneNumber: string
}

export const PostBaseForm: React.FC<{
  onSubmit: (postBase: Post_base) => void
}> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormInputs>()

  return (
    <form
      onSubmit={handleSubmit(data => {
        const postBase = {
          id: 0,
          label: data.label,
          description: data.description,
          location: data.location,
          photos: data.photos,
          phoneNumber: data.phoneNumber
        }
        onSubmit(postBase)
      })}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="label"
        label="Label"
        variant="outlined"
        inputRef={register({ required: true })}
        error={!!errors.label}
        helperText={errors.label && "Label is required"}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        inputRef={register({ required: true })}
        error={!!errors.description}
        helperText={errors.description && "Description is required"}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        name="location"
        label="Location"
        variant="outlined"
        inputRef={register({ required: true })}
        error={!!errors.location}
        helperText={errors.location && "Location is required"}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        name="photos"
        label="Photos"
        variant="outlined"
        inputRef={register({ required: true })}
        error={!!errors.photos}
        helperText={errors.photos && "Photos is required"}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        inputRef={register({ required: true })}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber && "Phone Number is required"}
        sx={{ marginBottom: '20px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  )