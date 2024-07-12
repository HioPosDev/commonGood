import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/generalContext';
import Plate from '../plate/plate.component';
import './products.style.css'
import { ClipLoader } from 'react-spinners';

const ProductsList: React.FC = () => {
    
    const {tableNumber, roomNumber } = useGeneralContext();
    const [products, setProducts] = useState([]);

    console.log('PERE PRODUCTS: ', products);
    

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`https://commongood.hiopos.cloud/npush/gethiodata?table=${tableNumber}&room=${roomNumber}`);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
        const interval = setInterval(getProducts, 60000);
        return () => clearInterval(interval);
    }, [tableNumber, roomNumber])



    return (
        <div className='products-list'>
            {
                products.length > 0 ? (
                    <div>
                        {
                            products.map((plate: {
                                Item: string
                                CodStatus: number
                            }) => {
                                return (
                                    <Plate name={plate.Item} state={plate.CodStatus}/>
                                )
                            } )
                        }
                    </div>
                ) : (
                    <div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            // loading={isLoading}
                        />   
                    </div>
                )
            }
        </div>
    );
};

export default ProductsList;
