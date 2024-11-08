import { Input, Label } from 'keep-react'
import { useForm } from "react-hook-form"
import { Button } from 'keep-react'


export default function LoginForm() {

  const {register, handleSubmit, formState: {errors} } = useForm()
  const FormError = ({message}) => (
    <div className= "block font-medium text-red-500 text-3xl">
      {message}
    </div>
  )

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>    
      <fieldset className="max-w-md space-y-1">
      <Label htmlFor="username">Usuario</Label>
      <Input id="username" placeholder="Enter name" type="text" 
      {...register('username', {required: 'Es necesario introducir el usuario'})}
      />
      {errors.username && <FormError message={errors.username.message}/>}
    </fieldset>
      <fieldset className="max-w-md space-y-1">
      <Label htmlFor="password">Contraeña</Label>
      <Input id="password" placeholder="Enter name" type="password" 
      {...register('password', {required: 'Es necesario introducir el usuario'})}
      />
      {errors.password && <FormError message={errors.password.message}/>}
    </fieldset>
    <Button color="success">Iniciar Sesión</Button>
    </form>
    </div>
  )
}
