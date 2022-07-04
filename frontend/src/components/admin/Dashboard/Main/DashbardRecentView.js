import {React,useState,useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../../../Styles/DashboardMain/RecentView.css' 
import ReactStars from "react-stars";


function DoashboardRecentView(props){
    const topRecentVotes = props.topRecentVote;

    return(
        <div className="recent-view">
             <div className={`headerbox ${props.color}`}>
                <FontAwesomeIcon icon={props.icon}  className="icon"/>
            </div>
            <div className="top-five-title">
                Recent Reviews   
            </div>
            <div className="recent-content">
            {topRecentVotes.map((topRecentVote,index)=>{
                const ratingStar = {
                    size: 12,
                    value: topRecentVote.ratingStar,
                    edit: false,
                    activeColor: "#fda32a",
                    color: "#ddd",
                    isHalf: true
                };
                 return(
                    <div key = {index} 
                    >
                        <div className="count-line"></div>
                        <div  className="flex space-between">
                             <div className="flex ">
                            <div>anh</div>
                            <div className="review-product-name">
                                <h5>{topRecentVote.productName}</h5>
                                <p>{topRecentVote.ratingText}</p>
                            </div>
                            </div>
                            <div>
                          {(topRecentVote.ratingHours && topRecentVote.ratingMinutes) && 
                          <div className="review-product-hours flex">
                          <p>{topRecentVote.ratingHours}:</p>
                          <p>{topRecentVote.ratingMinutes}</p>
                        </div>
                          }
                          {
                            (!topRecentVote.ratingHours && !topRecentVote.ratingMinutes) &&
                            <div className="review-product-hours flex">
                                <p>{topRecentVote.ratingYears}/</p>
                                <p>{topRecentVote.ratingMonths}/</p>
                                <p>{topRecentVote.ratingDays}</p>
                            </div>
                          }
                           <div><ReactStars {...ratingStar} /></div>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            </div>

            
        </div>
    )

}


export default DoashboardRecentView