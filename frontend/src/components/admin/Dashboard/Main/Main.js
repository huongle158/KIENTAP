import {React,useState,useEffect } from 'react';
import axios from 'axios'
import DashboardTopFive from './DashboardTopFive'
import DashboardTotalCount from './DashboardTotalCount'
import DoashboardRecentView from './DashbardRecentView';
import '../../../../Styles/DashBoardMain.css'

import {faFileInvoice,faTshirt,faMoneyBillWave,faUser,faStar} from '@fortawesome/free-solid-svg-icons'
function Main(){
    const [products, setProducts] = useState([]);
    const [topProductSales, setTopProductSales] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/products`)
            .then(res => {
                setProducts(res.data)
                let virtualProducts = [...res.data]
                virtualProducts.sort((a,b) =>  b.productSold - a.productSold)
                let virtualProducts2 = [...virtualProducts.sort((a,b) =>  b.productSold - a.productSold)]
                console.log(virtualProducts2);
                setTopProductSales(virtualProducts2)
            }
        )
    },[]);


    const totalCounts = [
        {
            id: 1,
            title: "Total orders",
            count:3,
          
            isDecrease: true,
            color: "orange",
            icon: faFileInvoice
        },
        {
            id: 2,
            title: "Total sales",
            count:3,
            
            isDecrease: false,
            color: "pink",
            icon: faTshirt
        },
        {
            id: 3,
            title: "Income",
            count:3,
           
            isDecrease: false,
            color: "green",
            icon: faMoneyBillWave
        },
        {
            id: 4,
            title: "Users",
            count:3,
            percent: 20,
            isDecrease: true,
            color: "lightblue",
            icon: faUser
        },
    ]
    const recentVote = [];
    if(products.length >0){
        for (let  i = 0 ; i < products.length ; i++){
            const productVote = products[i].productVote;
            for(let j = 0; j < productVote.length; j++ ){
                const newRatingDate = new Date(productVote[j].ratingDate);
                productVote[j].productName = products[i].productName
                if(newRatingDate.getDate() === new Date().getDate()){
                    let hours = newRatingDate.getHours().toString();
                    let minutes = newRatingDate.getMinutes().toString();
                    if ( hours < 10) {
                        hours = "0" + hours
                    }
                    if (minutes < 10) {
                        minutes = "0" + minutes
                    }
                    productVote[j].ratingHours = hours;
                    productVote[j].ratingMinutes = minutes;
                }
                else{
                    let days = newRatingDate.getDate().toString();
                    let months = (newRatingDate.getMonth()+1).toString();
                    if (days < 10) {
                        days = "0" + days
                    }
                    if (months < 10) {
                        months = "0" + months
                    }
                    productVote[j].ratingDays = days;
                    productVote[j].ratingMonths = months;
                    productVote[j].ratingYears = newRatingDate.getFullYear().toString();
                }
                recentVote.push(productVote[j])
                }
            }
        }
    if (recentVote) {
            recentVote.sort(function(a,b){
                return new Date(b.ratingDate) - new Date(a.ratingDate);
            });
        }
    
    const topRecentVote = recentVote.splice(0,5)    
  
    return (
        <div className="Dashboard-main">
        <div className="Dashboard-main-item">
            {   totalCounts.map((totalCount)=>{
                return (
                         <DashboardTotalCount 
                           totalCount={totalCount}
                            key={totalCount.id}
                         />
                         )
                        })
            }
            </div> 
        <div className="Dashboard-main-item">
                    <DashboardTopFive 
                        title="Top products by selling"
                        data = {topProductSales}
                        icon = {faTshirt}
                        color = "pink"
                        table = {[
                            {
                                title: 'Products name'
                            },
                            {
                                title: 'Total sales'
                            },
                        ]}
                    />
                     <DashboardTopFive 
                        title="Top Users by selling"
                        data = {topProductSales}
                        icon = {faUser}
                        color = "lightblue"
                        table = {[
                            {
                                title: 'User name'
                            },
                            {
                                title: 'Total orders'
                            },
                        ]}
                    />


        </div>
        <div className="Dashboard-main-item">
            <DoashboardRecentView 
                icon = {faStar}
                title = "Recent Reviews"
                color = "orange"
                topRecentVote = {topRecentVote}
            />
        </div>
       
        </div>
    )
}
export default Main