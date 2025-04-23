import { useState } from "react";

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
  //array to be rendered
  //const friends = initialFriends;
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function HandleFriends(newFriend) {
    setFriend((actualFriends) => [...friends, newFriend]);
    setShowAddFriend(false); //once submited, hide the form
  }

  function HandleSelection(friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((currentSelected) => (currentSelected?.id === friend.id ? null : friend));

    //set to false so that when you select a friend the add form will be closed
    setShowAddFriend(false);
  }

  //
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendsProp={friends}
          selectedFriendProp={selectedFriend}
          onSelectionProp={HandleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriendProp={HandleFriends} />}

        <Button onClickProp={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriendProp={selectedFriend} />}
    </div>
  );
}
///////////////////////////////////////////////////////
function FriendList({ friendsProp, onSelectionProp, selectedFriendProp }) {
  //
  return (
    <ul>
      {friendsProp.map((friend) => (
        <Friend
          friendProp={friend}
          key={friend.id}
          onSelectionProp={onSelectionProp}
          selectedFriendProp={selectedFriendProp}
        />
      ))}
    </ul>
  );
}
///////////////////////////////////////////////////////
function Friend({ friendProp, onSelectionProp, selectedFriendProp }) {
  // it will useful to conditionanly aplpy styles (background changes)
  const isSelected = friendProp.id === selectedFriendProp?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClickProp={() => onSelectionProp(friendProp)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
///////////////////////////////////////////////////////
function Button({ children, onClickProp }) {
  return (
    <button
      className="button"
      onClick={onClickProp}>
      {children}
    </button>
  );
}
///////////////////////////////////////////////////////
//Create one state to each fields to get its data
function FormAddFriend({ onAddFriendProp, onShowAddFriendProp }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  //
  function handleSubmit(e) {
    e.preventDefault();

    //validating the fields:
    if (!name || !image) {
      alert("Please fill all fields");
      return; // nothing will happen
    }

    const id = crypto.randomUUID(); //generates a random id
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`, //generates a unique img takeing advantage of the default url in the state
      balance: 0,
    };

    onAddFriendProp(newFriend);

    //reseting the fields:
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  //
  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}>
      <label>🧞Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => e.target.value}
      />

      <Button>Add</Button>
    </form>
  );
}
///////////////////////////////////////////////////////
function FormSplitBill({ selectedFriendProp }) {
  //remember: friendProp is an object
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriendProp.name}</h2>
      <label>💵Bill Value</label>
      <input type="text" />

      <label>💵Your Expanse</label>
      <input type="text" />

      <label>💵{selectedFriendProp.name}'s Expense</label>
      <input
        type="text"
        disabled
      />
      <label>💸Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriendProp.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
