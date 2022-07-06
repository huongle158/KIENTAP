
import '../../../../Styles/DashBoardMain.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons'
function DashboardTotalCount(props) {
    const totalCount = props.totalCount
    return(
       
            <div className="total-count-item">
                <div className="total-count-item-container"
                    style={{position: 'relative'}}
                    >
                    <div className={`total-count-icon ${totalCount.color}`}>
                        <FontAwesomeIcon icon={totalCount.icon} className="icon"/>
                    </div>
                    <div className="total-count-title count-item">{totalCount.title}</div>
                    <div  className="total-count-count count-item">{totalCount.count}</div>
                    <div className='count-line '></div>
                   {totalCount.isDecrease&& <div className="count-status">
                         <p className="count-item flex"><span><FontAwesomeIcon icon={faArrowUp} className="count-up"/></span> %</p> 
                         <p className="count-item">since last month</p>
                    </div>}
                    {!totalCount.isDecrease && <div className="count-status">
                    <p className="count-item flex"><span><FontAwesomeIcon icon={faArrowDown} /></span> %  </p> 
                         <p className="count-item">since last month</p>
                    </div>}

                </div>
            </div>



     
    )
}
export default DashboardTotalCount