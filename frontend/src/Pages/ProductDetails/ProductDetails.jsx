import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../Redux/actions/productActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";

function ProductDetails() {
   const [quantity, setQuantity] = useState(1);

  //**using redux to get data */
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error, loading } = useSelector((state) => state.productDetails);

  //  ***tap on image index
   const [index, setIndex] = useState(0);
   const myRef = createRef();
  
  
  
  useEffect(() => {
    //  ***tap on image index
    // myRef.current.children[index].className = `${styles.active}`;

    dispatch(detailsProduct(id));
  }, [dispatch, id, ]);

  //  ***tap on image index
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(`${styles.active}`, "");
    }
    images[index].className = styles.active ;
  };
  //**using hooke to get data */
  // const product = data.products.find((x) => x.id === id);
  // if (!product) {
  //   return <div style={{marginTop:"100px"}}> Product Not Found !</div>;
  // }

  return (
    <>
      <div className={styles.app}>

        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div className={styles.details}>
            <div className={styles.big_img}>
              <img src={product.img[index]} alt={product.name} />
            </div>
            <div className={styles.box}>
              <div className={styles.row}>
                <h2>{product.name}</h2>
              </div>
              <div className={styles.colors}>
                {product.colors.map((color, index) => (
                  <button key={index} style={{ background: color }}></button>
                ))}
              </div>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <div className={styles.status}>
                <div className={styles.sts}> Status</div>
                <div>
                  {product.countInStock > 0 ? (
                    <span className={styles.success}>In Stock</span>
                  ) : (
                    <span className={styles.error}>Unavailable</span>
                  )}
                </div>
              </div>

              <div className={styles.status}>
                <div className={styles.prc}> Price</div>
                <div className={styles.priceNum}>${product.price}</div>
              </div>

              <p className={styles.description}>{product.description}</p>
              <div className={styles.thumb} ref={myRef}>
                {product.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    onClick={() => {
                      handleTab(index);
                    }}
                  />
                ))}
              </div>
              {product.countInStock > 0 && (
                <>
                  <div className={styles.row}>
                    <h6>quantity</h6>
                    <div>
                      <select
                        className={styles.mySelect}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Link to={`/cart/${id}?quantity=${quantity}`}>
                    <button  className={styles.addToCardBtn}>Add to card</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
       
      </div>
    </>
  );
}

export default ProductDetails;
