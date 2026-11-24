const Header = () => {
  return (
    <div className="Header">
      <div>{import.meta.env.VITE_API_URL}</div>
      This is the Header
      <div>Yellow Bread.</div>
    </div>
  )
}

export default Header