import { useContext, useEffect, useState } from "react";
import { TopLevelRoute } from "App/types";
import { LoginViewContainer } from "./Login.components";
import { useNavigate } from "react-router-dom";
import { Input, InputVariants } from "components/Input";
import { Button, ButtonVariant } from "components/Button";
import { AppContext } from "App/App";
import { Session } from "lib";

const session = new Session();

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const context = useContext(AppContext);

  const { setIsLoggedIn, setPassword: setPasswordContext } = context || {};

  useEffect(() => {
    const checkMnemonic = async (): Promise<void> => {
      const encrypted = session.encryptedSeed;

      if (!encrypted) {
        return navigate(TopLevelRoute.AccountCreation);
      }
    };

    checkMnemonic();
  }, [navigate]);

  const handleUnlockClick = async (): Promise<void> => {
    setIsLoggingIn(true);

    try {
      session.secret = password;
      // Will fail if seed cannot be decrypted:
      await session.seed();
      setError(undefined);
      setIsLoggedIn && setIsLoggedIn();
      setPasswordContext && setPasswordContext(password);

      navigate(TopLevelRoute.Wallet);
    } catch (e) {
      setIsLoggingIn(false);
      setError(`An error has occured: ${e}`);
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <LoginViewContainer>
      <Input
        label="Enter password to unlock wallet"
        variant={InputVariants.Password}
        onChangeCallback={handlePasswordChange}
        error={error}
      />
      <Button
        variant={ButtonVariant.Contained}
        onClick={handleUnlockClick}
        disabled={!password} // TODO: Improve validation
      >
        Unlock Wallet
      </Button>
      {isLoggingIn && <p>Unlocking wallet...</p>}
    </LoginViewContainer>
  );
};

export default Login;