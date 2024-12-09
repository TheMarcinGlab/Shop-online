import { Component } from '@angular/core';
import {OrderHistory} from '../../common/order-history'
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  


  constructor(private orderHistoryService: OrderHistoryService){

  }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  
  handleOrderHistory(){
      //czytamy adres email z storage

      //const theEmail = JSON.parse(this.storage.getItem('userEmail'));
      const theEmail = this.storage.getItem('userEmail');

      console.log("sprawdzam: ");

      this.orderHistoryService.getOrderHistory(theEmail).subscribe(
        data => {
          this.orderHistoryList = data._embedded.orders;
        }
      );
  }

}
