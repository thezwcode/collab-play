function Login() {
  return (
    <div className="flex flex-col justify-center items-center m-0">
      <header className="">
        <a
          className="btn-spotify"
          href={`${import.meta.env.VITE_API_URL}/auth/login`}
        >
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;
