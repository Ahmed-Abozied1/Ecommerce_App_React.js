import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
function ProductCard({ product }) {
  return (
    <Card key={product._id} className={styles.mycards}>
      <Link to={`/product/${product._id}`}>
        
        <Card.Img  src={product.img[0]} />
      </Link> 
      <Card.Body>
        <Link
          style={{ textDecoration: "none" }}
          to={`/product/${product._id}`}
        >
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}/>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>$ {product.price}</strong>
        </Card.Text>
        <Button style={{backgroundColor:"#f0c040",color: "black"}}>Add to card</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
