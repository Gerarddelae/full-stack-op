export const Show = ({ name, setFilter }) => {
  const handleClick = () => {
    setFilter(name);
  };
  return <button onClick={handleClick}>show</button>;
};
