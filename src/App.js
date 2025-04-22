const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
    </div>
  );
}
///////////////////////////////////////////////////////
function FriendList() {
  //array to be rendered
  const friends = initialFriends;
  //
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friendProp={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}
///////////////////////////////////////////////////////
function Friend({ friendProp }) {
  return (
    <li>
      <img
        src={friendProp.image}
        alt={friendProp.name}
      />
      <h3>{friendProp.name}</h3>
      {friendProp.balance < 0 && (
        <p className="red">
          You owe {friendProp.name} C$ {Math.abs(friendProp.balance)}
        </p>
      )}
      {friendProp.balance > 0 && (
        <p className="green">
          {friendProp.name} owes you C$ {Math.abs(friendProp.balance)}
        </p>
      )}
      {friendProp.balance === 0 && <p>You and {friendProp.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}
///////////////////////////////////////////////////////
function Button({ children }) {
  return <button className="button">{children}</button>;
}
///////////////////////////////////////////////////////
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧞Friend Name</label>
      <input type="text" />
      <label>📷Image URL</label>
      <input type="text" />
      <Button>Select</Button>
    </form>
  );
}
///////////////////////////////////////////////////////
function FormSplitBill() {
  return (
    <form>
      <h2>Split a bill with friend</h2>
    </form>
  );
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
