const Login: React.FC<{ onTryLogin: (tryLogin: boolean) => void }> = ({
  onTryLogin,
}) => {
  return (
    <div className="flex flex-col justify-center items-center m-0">
      <header className="">
        <h2>Not logged in yet, please log in</h2>
        <button className="btn-spotify" onClick={() => onTryLogin(true)}>
          Login with Spotify
        </button>
      </header>
    </div>
  );
};

export default Login;
