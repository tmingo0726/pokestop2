import { useState } from "react";
import "./AdminCreate.css";

const BASE_URL = "http://localhost:4000/api";

const AdminCreate = () => {
  const [newProductName, setNewProductName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newRarity, setNewRarity] = useState("");
  const [newAbility1, setNewAbility1] = useState("");
  const [newAbility2, setNewAbility2] = useState("");
  const [newImagelink, setNewImageLink] = useState("");
  const [newInventorycount, setNewInventorycount] = useState("");
  const [newIsactive, setNewIsactive] = useState();

  const createProduct = async (
    productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imageLink,
    inventorycount,
    isactive
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          price,
          condition,
          rarity,
          ability1,
          ability2,
          imageLink,
          inventorycount,
          isactive,
        }),
      });
      const result = await response.json();
      console.log("RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(
      newProductName,
      newPrice,
      newCondition,
      newRarity,
      newAbility1,
      newAbility2,
      newImagelink,
      newInventorycount,
      newIsactive
    );
  };
  return (
    <div>
      <form id="new-product-form" onSubmit={handleSubmit}>
        <fieldset>
          <div id="new-product-inputs">
            <br />
            <legend>New Product Name:</legend>
            <input
              type="text"
              value={newProductName}
              placeholder="Name"
              required
              onChange={(event) => {
                setNewProductName(event.target.value);
              }}
            ></input>
            <legend>New Product Price:</legend>
            <input
              type="text"
              value={newPrice}
              placeholder="Price"
              required
              onChange={(event) => {
                setNewPrice(event.target.value);
              }}
            ></input>
            <legend>New Product Condition:</legend>
            <div id="condition-choices">
              <input
                type="radio"
                id="conditionChoice1"
                name="condition"
                value={newCondition}
                onChange={(event) => {
                  setNewCondition(event.target.value);
                }}
              ></input>
              <label htmlFor="conditionChoice1"> Mint </label>
              <input
                type="radio"
                id="conditionChoice2"
                name="condition"
                value={newCondition}
                onChange={(event) => {
                  setNewCondition(event.target.value);
                }}
              ></input>
              <label htmlFor="conditionChoice2"> Good </label>
              <input
                type="radio"
                id="conditionChoice3"
                name="condition"
                value={newCondition}
                onChange={(event) => {
                  setNewCondition(event.target.value);
                }}
              ></input>
              <label htmlFor="conditionChoice3"> Damaged </label>
            </div>
            <br />
            <legend>New Product Rarity: </legend>
            <div id="rarity-choices">
              <input
                type="radio"
                id="rarityChoice1"
                name="rarity"
                value={newRarity}
                onChange={(event) => {
                  setNewRarity(event.target.value);
                }}
              ></input>
              <label htmlFor="rarityChoice1"> Holographic </label>
              <input
                type="radio"
                id="rarityChoice2"
                name="rarity"
                value={newRarity}
                onChange={(event) => {
                  setNewRarity(event.target.value);
                }}
              ></input>
              <label htmlFor="rarityChoice2"> Rare </label>
              <input
                type="radio"
                id="rarityChoice3"
                name="rarity"
                value={newRarity}
                onChange={(event) => {
                  setNewRarity(event.target.value);
                }}
              ></input>
              <label htmlFor="rarityChoice3"> Common </label>
            </div>
            <br />
            <legend>New Product Ability 1: </legend>
            <input
              type="text"
              value={newAbility1}
              placeholder="Ability 1"
              required
              onChange={(event) => {
                setNewAbility1(event.target.value);
              }}
            ></input>
            <legend>New Product Ability 2: </legend>
            <input
              type="text"
              value={newAbility2}
              placeholder="Ability 2"
              onChange={(event) => {
                setNewAbility2(event.target.value);
              }}
            ></input>
            <legend>New Product Image URL</legend>
            <input
              type="text"
              value={newImagelink}
              placeholder="Image URL"
              onChange={(event) => {
                setNewImageLink(event.target.value);
              }}
            ></input>
            <legend>New Product Inventory</legend>
            <input
              type="text"
              value={newInventorycount}
              placeholder="How Many You Got?"
              onChange={(event) => {
                setNewInventorycount(event.target.value);
              }}
            ></input>
            <legend>New Product Active Status</legend>
            <div id="isactive-choices">
              <input
                type="radio"
                id="isactiveChoice1"
                name="isactive"
                value={newIsactive}
                checked
                onChange={(event) => {
                  setNewIsactive(event.target.value);
                }}
              ></input>
              <label htmlFor="isactiveChoice1"> True </label>
              <input
                type="radio"
                id="isactiveChoice2"
                name="isactive"
                value={newIsactive}
                onChange={(event) => {
                  setNewIsactive(event.target.value);
                }}
              ></input>
              <label htmlFor="isactiveChoice2"> False </label>
            </div>
            <br></br>
          </div>
        </fieldset>
        <button type="submit">Create New Product!</button>
      </form>
    </div>
  );
};

export default AdminCreate;
