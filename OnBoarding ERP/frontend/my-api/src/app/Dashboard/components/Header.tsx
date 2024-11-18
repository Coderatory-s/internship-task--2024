// app/dashboard/components/Header.tsx

// import styles from "../../CSS/header.module.css"; // Adjust this path based on your directory structure

const Header = () => {
  return (
    <header className="flex flex-col items-center p-4 bg-sky-900 text-white">
      <h1 className="text-2xl font-bold mb-2">
        Welcome to the Employee Dashboard
      </h1>
      <p className="text-lg">Manage your employees efficiently.</p>
    </header>
  );
};

export default Header;
