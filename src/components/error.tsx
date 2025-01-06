import React from "react";

function ErrorComponent({
  onRetry,
  title,
  description,
}: {
  onRetry?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title?: string;
  description?: string;
}) {
  return <div onClick={onRetry}>{title}</div>;
}

export default ErrorComponent;
