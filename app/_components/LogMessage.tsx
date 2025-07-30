interface LogMessageProp {
  children: React.ReactNode;
}

function LogMessage({ children }: LogMessageProp) {
  return (
    <div className=" grid h-screen place-items-center">
      <div>
        <p className=" mb-10 text-center text-2xl md:mb-16 md:text-2xl">
          Log in successful!
        </p>
        {children}
      </div>
    </div>
  );
}

export default LogMessage;
