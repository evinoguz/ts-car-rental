type Props = {
  children: string;
};
const Warning = ({ children }: Props) => {
  return <div className="my-5 fw-bold">{children}</div>;
};
export default Warning;
