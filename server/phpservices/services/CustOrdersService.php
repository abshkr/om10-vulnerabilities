<?php
require_once(dirname(__FILE__) . '/../classes/CustOrders.class.php');

class CustOrdersService {
    var $tbl_name = "GUI_ORDERS";

    public function count($values, $dtypes, $sorts, $orders)
	{
        $g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}

        $rows = $g->count($this->tbl_name,$filter);
        return $rows;
    }

    public function isOrderNoUsed($order_id)
	{
        $g = new GlobalClass();
		$tbl_name = "CUST_ORDER";
		$filter = "WHERE ORDER_NO=" . $order_id . " ";
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }

    public function isOrderCustNoUsed($supplier, $order_id)
	{
        $g = new GlobalClass();
		$tbl_name = "CUST_ORDER";
		$filter = "where ORDER_CUST_ORDNO=" . $order_id . " and (ORDER_CUST in (select CUST_ACCT from CUSTOMER where CUST_SUPP='" . $supplier . "' ) )";
        $rows = $g->count( $tbl_name, $filter);
        return $rows;
    }
    
    public function getAll()
	{
        $g = new GlobalClass();
        $rows = $g->getAll($this->tbl_name);
        return $rows;
    }
    
    public function getPaged($values, $dtypes, $sorts, $orders, $offset, $tot)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $et = new CustOrdersClass();
        $rows = $et->getPaged($offset,$tot,$filter,$sort);
        return $rows;
    }    
	
    public function getReports($values, $dtypes, $sorts, $orders)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $et = new CustOrdersClass();
        $rows = $et->getReports($filter,$sort);
        return $rows;
    }    
	
    public function getPagingReports($values, $dtypes, $sorts, $orders, $offset, $tot)
	{
		$g = new GlobalClass();
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types );
		}
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
	
        $et = new CustOrdersClass();
        $rows = $et->getPagedReport($offset,$tot,$filter,$sort);
        return $rows;
    }    

    public function create($data)
	{
        
        $data->session_id = $_SESSION['SESSION'];
        $co = new CustOrdersClass();
        $ret = $co->create($data);
        return $ret;
    }
    
    public function update($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $co = new CustOrdersClass();
        $ret = $co->update($data);
        return $ret;
    }
    
    public function remove($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $co = new CustOrdersClass();
        $ret = $co->delete($data);
        return $ret;
    }
/*    
    public function delete($data){
        $g = new GlobalClass();
        $ret = $g->delete($this->tbl_name,$data->tnkr_code);
        return $ret;
    }
*/   
    
    public function approve($data)
	{

        $data->session_id = $_SESSION['SESSION'];
        $co = new CustOrdersClass();
        $ret = $co->approve($data);
        return $ret;
    }
    
	
	
    public function getNextOrderCustNum( $data )
	{

        $data->session_id = $_SESSION['SESSION'];
        $co = new CustOrdersClass();
        $ret = $co->getNextOrderCustNum($data);
        return $ret;
    }
   
    public function getOrderInstructions( $order_id, $counter )
	{
        $co = new CustOrdersClass();
        return $co->getOrderInstructions( $order_id, $counter );
    }
   
    public function getOrderInstructionsAsString( $order_id, $counter )
	{
        $co = new CustOrdersClass();
        return $co->getOrderInstructionsAsString( $order_id, $counter );
    }
   
    public function getOrderItems( $order_id )
	{
        $co = new CustOrdersClass();
        return $co->getOrderItems( $order_id );
    }
   
    public function getOrderSchedules( $order_id )
	{
        $co = new CustOrdersClass();
        return $co->getOrderSchedules( $order_id );
    }
   
    public function initOrderItems( $drawer )
	{
        $co = new CustOrdersClass();
        return $co->initOrderItems( $drawer );
    }
   
    public function getOrderPeriods( $order_id, $prod_code, $prod_cmpy )
	{
        $co = new CustOrdersClass();
        return $co->getOrderPeriods( $order_id, $prod_code, $prod_cmpy );
    }
   
    public function getOrderItemSchedules( $order_id, $prod_code, $prod_cmpy )
	{
        $co = new CustOrdersClass();
        return $co->getOrderItemSchedules( $order_id, $prod_code, $prod_cmpy );
    }
   
    public function initOrderPeriods( $prod_code, $prod_cmpy )
	{
        $co = new CustOrdersClass();
        return $co->initOrderPeriods( $prod_code, $prod_cmpy );
    }
   
    public function lookupOrderCustomer( $supplier )
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderCustomer( $supplier );
    }
   
    public function lookupOrderCompany($type)
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderCompany($type);
    }
   
    public function lookupCompatibleDrawer($cmpy, $prod)
	{
        $co = new CustOrdersClass();
        return $co->lookupCompatibleDrawer($cmpy, $prod);
    }
	
    public function lookupOrderMethodType()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderMethodType();
    }
	
    public function lookupOrderTrnsptType($ord_mthd)
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderTrnsptType($ord_mthd);
    }
	
    public function lookupOrderStatusType()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderStatusType();
    }
	
    public function lookupOrderSaleType()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderSaleType();
    }
	
    public function lookupOrderDelvLocation()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderDelvLocation();
    }
 	
    public function lookupOrderTerminal()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderTerminal();
    }
	
    public function lookupOrderPsnl($employer, $role)
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderPsnl($employer, $role);
    }
	
    public function lookupOrderErpType()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderErpType();
    }
	
    public function lookupOrderUnit()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderUnit();
    }
	
    public function lookupOrderPriceType()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderPriceType();
    }
	
    public function lookupOrderPriceOffset()
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderPriceOffset();
    }
	
    public function lookupOrderProduct( $drawer )
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderProduct( $drawer );
    }
        
    public function lookupOrderTrip($supplier, $status)
	{
        $co = new CustOrdersClass();
        return $co->lookupOrderTrip($supplier, $status);
    }
	
}
?>