import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useGeneralContext } from '../../context/generalContext';
import Plate from '../plate/plate.component';
import './products.style.css'
import { ClipLoader } from 'react-spinners';
import alertIcon from './notification_4418844.png'
import AlertNotificationsDialogSlide from '../dialog/dialog-alert.component';

const ProductsList: React.FC = () => {
    
    const {tableNumber, roomNumber, notificationsAccepted } = useGeneralContext();
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}gethiodata?table=${tableNumber}&room=${roomNumber}`);
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
        const interval = setInterval(getProducts, 60000);
        return () => clearInterval(interval);
    }, [tableNumber, roomNumber])

    const closeDialogHandler = () => {
        setOpenDialog(false);
    }

    return (
        <div>
            <div className='products-title-with-alerts'>
                {
                    !notificationsAccepted && (
                        <>
                            <button className='products-alert' type='button' onClick={() => setOpenDialog(true)}>
                                <img className='products-alertIcon' src={alertIcon} alt="test" />
                            </button>
                            <AlertNotificationsDialogSlide openDialog={openDialog} handleClose={closeDialogHandler} />
                        </>
                    )
                }
                <p className={`products-title-${notificationsAccepted ? '1' : '2'}`}>Pedido en curso: </p>
            </div>
            <div className='products-list'>

                {
                    isLoading && (
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <ClipLoader
                                size={50}
                                color={"#123abc"}
                                // loading={isLoading}
                            />   
                        </div>
                    )
                }

                {
                    !isLoading && !(products.length > 0) && (
                        <div className='products-plate-list'>
                            <p>No hay productos asociados a esta mesa</p>
                        </div>
                    )
                }

                {
                    !isLoading && products.length > 0 && (
                        <div className='products-plate-list'>
                            {
                                products.map((plate: {
                                    Item: string;
                                    CodStatus: number;
                                    Uts: number;
                                }) => {
                                    return (
                                        <Plate name={plate.Item} state={plate.CodStatus} units={plate.Uts}/>
                                    )
                                } )
                            }
                        </div>
                    )
                }
                
                <div className="test"></div>
            </div>
        </div>
    );
};

export default ProductsList;
