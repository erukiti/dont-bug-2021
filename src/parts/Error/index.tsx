import { VFC } from "react";

type Props = {
  errorMessage?: string;
};

export const ErrorMessage: VFC<Props> = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <code>
        <pre>{errorMessage}</pre>
      </code>
    );
  } else {
    return <></>;
  }
};
