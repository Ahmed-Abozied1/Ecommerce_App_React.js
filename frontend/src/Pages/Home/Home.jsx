import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
// import axios from "axios";
// import data from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { ListProduct } from "../../Redux/actions/productActions";

function Home() {

  //*****Use Hooks to manage data****
  // const [products,setProducts]=useState([]);
  // const [loading,setLoading]=useState(false);
  // const [error,setError]=useState(false);
  // useEffect(() => {
  //   const fetchData= async ()=>{
  //     try {
  //       setLoading(true);
  //       const {data}= await axios.get('/api/products');
  //       setLoading(false);
  //       setProducts(data);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }

  //   }
  // fetchData();

// }, []);

   //*****Use Redux to manage data****

  const dispatch = useDispatch();
  const { loading, error, products }= useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(ListProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className={styles.row}>
          {products.map((product, index) => (
            <Col key={index} sm={6} md={4} lg={3} className="mb-3">
              <ProductCard product={product} />
            </Col>
          ))}
        </div>
      )}
    </>
  );
}
export default Home;
