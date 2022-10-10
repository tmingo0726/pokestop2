import { useState } from "react";

const BASE_URL = "http://localhost:4000/api";

const AdminUpdateProduct = () => {
  const [currentProductName, setCurrentProductName] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateCondition, setUpdateCondition] = useState("");
  const [updateRarity, setUpdateRarity] = useState("");
  const [updateAbility1, setUpdateAbility1] = useState("");
  const [updateAbility2, setUpdateAbility2] = useState("");
  const [updateImagelink, setUpdateImagelink] = useState("");
  const [updateInventorycount, setUpdateInventorycount] = useState("");
  const [updateIsactive, setUpdateIsactive] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const updateProduct = async (
    currentName,
    productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/editproduct`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentName,
          name: productName,
          price,
          condition,
          rarity,
          ability1,
          ability2,
          imagelink,
          inventorycount,
          isactive,
        }),
      });
      const result = await response.json();
      {
        result.success ? setSuccess("Successfully updated") : null;
      }
      setError(result.error);
      setErrorMessage(result.message);
      console.log("RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(
      currentProductName,
      updateProductName,
      updatePrice,
      updateCondition,
      updateRarity,
      updateAbility1,
      updateAbility2,
      updateImagelink,
      updateInventorycount,
      updateIsactive
    );
  };
  return (
    <div>
      <form id="update-product-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2>Update A Product</h2>
          </legend>
          <div id="update-product-inputs">
            <br />
            <legend>Current Product Name:</legend>
            <input
              type="text"
              //   value={currentProductName}
              placeholder="Name"
              required
              onChange={(event) => {
                setCurrentProductName(event.target.value);
              }}
            ></input>
            <legend>Update Product Name:</legend>
            <input
              type="text"
              //   value={updateProductName}
              placeholder="Name"
              onChange={(event) => {
                setUpdateProductName(event.target.value);
              }}
            ></input>
            <legend>Update Product Price:</legend>
            <input
              type="text"
              //   value={updatePrice}
              placeholder="Price"
              onChange={(event) => {
                setUpdatePrice(event.target.value);
              }}
            ></input>
            <legend>Update Product Condition:</legend>
            <div id="condition-choices">
              <input
                type="radio"
                id="conditionChoice1"
                name="condition"
                // value={updateCondition}
                onChange={() => {
                  setUpdateCondition("Mint");
                }}
              ></input>
              <label htmlFor="conditionChoice1"> Mint </label>
              <input
                type="radio"
                id="conditionChoice2"
                name="condition"
                // value={updateCondition}
                onChange={() => {
                  setUpdateCondition("Good");
                }}
              ></input>
              <label htmlFor="conditionChoice2"> Good </label>
              <input
                type="radio"
                id="conditionChoice3"
                name="condition"
                // value={updateCondition}
                onChange={() => {
                  setUpdateCondition("Damaged");
                }}
              ></input>
              <label htmlFor="conditionChoice3"> Damaged </label>
            </div>
            <br />
            <legend>Update Product Rarity: </legend>
            <div id="rarity-choices">
              <input
                type="radio"
                id="rarityChoice1"
                name="rarity"
                // value={updateRarity}
                onChange={() => {
                  setUpdateRarity("Holographic");
                }}
              ></input>
              <label htmlFor="rarityChoice1"> Holographic </label>
              <input
                type="radio"
                id="rarityChoice2"
                name="rarity"
                // value={updateRarity}
                onChange={() => {
                  setUpdateRarity("Rare");
                }}
              ></input>
              <label htmlFor="rarityChoice2"> Rare </label>
              <input
                type="radio"
                id="rarityChoice3"
                name="rarity"
                // value={updateRarity}
                onChange={() => {
                  setUpdateRarity("Common");
                }}
              ></input>
              <label htmlFor="rarityChoice3"> Common </label>
            </div>
            <br />
            <legend>Update Product Ability 1: </legend>
            <input
              type="text"
              //   value={updateAbility1}
              placeholder="Ability 1"
              onChange={(event) => {
                setUpdateAbility1(event.target.value);
              }}
            ></input>
            <legend>Update Product Ability 2: </legend>
            <input
              type="text"
              //   value={updateAbility2}
              placeholder="Ability 2"
              onChange={(event) => {
                setUpdateAbility2(event.target.value);
              }}
            ></input>
            <legend>Update Product Image URL</legend>
            <input
              type="text"
              //   value={updateImagelink}
              placeholder="Image URL"
              onChange={(event) => {
                setUpdateImagelink(event.target.value);
              }}
            ></input>
            <legend>Update Product Inventory</legend>
            <input
              type="text"
              //   value={updateInventorycount}
              placeholder="How Many You Got?"
              onChange={(event) => {
                setUpdateInventorycount(event.target.value);
              }}
            ></input>
            <legend>Update Product Active Status</legend>
            <div id="isactive-choices">
              <input
                type="radio"
                id="isactiveChoice1"
                name="isactive"
                // value={updateIsactive}
                checked
                onChange={() => {
                  setUpdateIsactive(true);
                }}
              ></input>
              <label htmlFor="isactiveChoice1"> True </label>
              <input
                type="radio"
                id="isactiveChoice2"
                name="isactive"
                // value={updateIsactive}
                onChange={() => {
                  setUpdateIsactive(false);
                }}
              ></input>
              <label htmlFor="isactiveChoice2"> False </label>
            </div>
            <br></br>
          </div>
        </fieldset>
        <button type="submit">Update Product!</button>
        <div>{error ? `${errorMessage}` : `${success}`}</div>
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
