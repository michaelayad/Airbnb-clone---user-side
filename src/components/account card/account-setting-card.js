const AccountSettingCard = ({ icon, title, description }) => {
  return (
    <>
      <div className="d-flex flex-column shadow-lg p-3 bg-body rounded text-dark h-100">
        <i className={`bi ${icon} fs-1`}></i>
        <p className="fs-5 py-0 m-0 text-dark fw-bold"> {title}</p>
        <p className="text-secondary"> {description} </p>
      </div>
    </>
  );
};

export default AccountSettingCard;
