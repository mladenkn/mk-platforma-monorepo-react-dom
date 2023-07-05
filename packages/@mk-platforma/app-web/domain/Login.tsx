type Props = {
  csrfToken?: string
}

export default function Login({ csrfToken }: Props) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  )
}
