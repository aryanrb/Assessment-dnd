
const ProfileIcon = ({ name }) => {
  // Generate a random color for the background
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Extract the first letter from the name
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="w-12 h-12 text-xl font-bold flex items-center justify-center rounded-full text-white" style={{ backgroundColor: randomColor() }}>
      {firstLetter}
    </div>
  );
};

export default ProfileIcon;
