import { useAuth } from "../../../../hooks/useAuth"
export default function Profile() {
  const {usuario} = useAuth();
  console.log(usuario)
  return (
    <div className=" dark:text-amber-50">profile</div>
  )
}
