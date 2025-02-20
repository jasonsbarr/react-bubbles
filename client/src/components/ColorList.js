import React, { useState } from "react";
import axios from "axios";
import { AxiosWithAuth } from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const getColorId = color =>
    colors.find(c => c.color === color.color)["id"];

  const editColor = color => {
    setEditing(true);
    const id = getColorId(color);
    setColorToEdit({ ...color, id });
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    AxiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {
        color: colorToEdit.color,
        id: colorToEdit.id,
        code: { hex: colorToEdit.code.hex }
      })
      .then(setEditing(false))
      .catch(console.error);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    AxiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  color: e.target.value
                })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
