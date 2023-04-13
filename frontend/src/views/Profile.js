import React from "react";

export function Profile(props) {
const [oldPassword, setOldPassword] = React.useState("");
const [newPassword, setNewPassword] = React.useState("");

function handleChangePassword() {
// Send oldPassword and newPassword to backend for processing
console.log("Old password:", oldPassword);
console.log("New password:", newPassword);
}
    return (
        <div className="large row-sml gap-20">
        <div className="large-5 col gap-20">
        <div className="col x-large border bg-white pad-20 radius-20">
        <span className="clr-gray">
        username : {JSON.parse(sessionStorage.getItem("user")).username}
        </span>
        <span className="clr-gray">
        mail : {JSON.parse(sessionStorage.getItem("user")).mail}
        </span>
        </div>
        </div>
        <div className="large-5">
    <div className="x-large bg-white radius-20 pad-20 col border">
      <div className="x-large border-btm row">
        <span className="clr-gray">Change Your Password</span>
      </div>
      <div className="col">
        <div className="inputs marge-top-10 marge-4">
          <input
            type="password"
            name="old_password"
            id="checkbox"
            className="input"
            placeholder="Old password.."
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="inputs marge-4">
          <input
            type="password"
            name="new_password"
            id="checkbox"
            className="input"
            placeholder="New password.."
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <input
        type="submit"
        className="link-submit font bold clr-white marge-top-30"
        value="Save info"
        onClick={handleChangePassword}
      />
    </div>
  </div>
</div>
);
}
