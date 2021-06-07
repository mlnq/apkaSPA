import { useState, useEffect } from "react";
import styles from "./Book.module.css";
import { useHistory } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";
import Rating, { IconContainerProps } from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Controller } from "react-hook-form";

function AddBook(props: any) {
  const history = useHistory();
  const [button, setButton] = useState(false);
  const [starRate, setRating] = useState(1);

  const [form, setForm] = useState({
    title: "",
    author: "",
    date: "01.01.0001",
    released: "",
    description: "",
    rating: starRate,
  });

  const inputOnChange = (e: any) => {
    const { name, value } = e.target;
    let val = value;
    if (e.target.type === "number") val = Number(val);
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  useEffect(() => {
    if (
      form.title.length > 4 &&
      form.author.length !== 0 &&
      form.rating > 0 &&
      form.rating <= 10 &&
      form.description.length > 30
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [form]);

  const submit = (e: any) => {
    e.preventDefault();
    props.addBook(form);
    history.push("/");
  };

  const StyledRating = withStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
  })(Rating);

  return (
    <div>
      <h1 className="header"> Dodaj książkę</h1>

      <div className={`card ${styles.hotel}`}>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Nazwa książki</label>
              <input
                value={form.title}
                type="text"
                className={`form-control ${
                  form.title.length > 4 ? "is-valid" : "is-invalid"
                } `}
                name="title"
                placeholder="Wprowadź tytuł książki.."
                onChange={inputOnChange}
              />
              <div className="invalid-feedback">Za krótki tytuł książki!</div>
              <div className="valid-feedback">Wszystko jest w porządku!</div>
              <br />
            </div>
            <div className="form-group">
              <label>Autor</label>
              <input
                value={form.author}
                type="text"
                className={`form-control ${
                  form.author.length !== 0 ? "is-valid" : "is-invalid"
                }`}
                name="author"
                placeholder="Wprowadź nazwę autora"
                onChange={inputOnChange}
              />
              <div className="invalid-feedback">
                Wymagane jest imię i nazwisko autora!
              </div>
              <div className="valid-feedback">Wszystko jest w porządku!</div>
              <br />
            </div>
            <div className="form-group">
              <label>Ocena</label>
              {/* <input
                value={form.rating}
                type="number"
                className={`form-control ${form.rating > 0 && form.rating <=10 ? 'is-valid' : 'is-invalid'}`}
                name="rating"
                placeholder="Oceń książkę.."
                onChange={inputOnChange}
                pattern="[0-9]*"
              /> */}

              <Box component="fieldset" mb={3} borderColor="transparent">
                <StyledRating
                  name="customized-10"
                  max={10}
                  value={starRate}
                  precision={0.5}
                  onChange={(e, value: any) => {
                    setRating(value);
                    form.rating = value;
                   
                  }}  
                />
              </Box>
              <div className="invalid-feedback">Niepoprawna ocena ksiażki!</div>
              <div className="valid-feedback">Wszystko jest w porządku!</div>
              <br />
            </div>
            {/* zrobic eleganckie input na date moze callendar component?
             */}

            <div className="form-group">
              <label>Data wydania</label>
              <input
                value={form.date}
                type="text"
                className="form-control"
                name="date"
                placeholder="Podaj datę wydania.."
                onChange={inputOnChange}
              />
              <br />
            </div>

            <div className="form-group">
              <label className="custom-control-label">
                Książka wydrukowana...{" "}
              </label>
              <input
                className="bg-primary custom-control custom-checkbox"
                type="checkbox"
                value="published"
                checked={form.released === "published"}
                name="released"
                onChange={inputOnChange}
              />
              <br />
              <br />
            </div>

            <div className="form-group">
              <label>Wprowadź opis książki</label>
              <textarea
                value={form.description}
                className={`form-control ${
                  form.description.length > 30 ? "is-valid" : "is-invalid"
                }`}
                name="description"
                onChange={inputOnChange}
              />
              <div className="invalid-feedback">
                Wyagany jest nawet krótki opis książki!
              </div>
              <div className="valid-feedback">Wszystko jest w porządku!</div>

              <br />
            </div>

            <br />
            <button
              className={`btn btn-primary ${
                button === false ? "disabled" : null
              }`}
            >
              Dodaj książkę
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
