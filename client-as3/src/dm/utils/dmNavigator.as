package dm.utils
{
	import dm.utils.tools;
	

	public class dmNavigator
	{
		//Total Records: The number of total records in all pages of the current screen.
		public var totalRecords:uint;
		//Total Pages: The number of total pages of the current screen. 
		public var totalPages:uint;
		//Rows/Pages: Shows how many lines in each page. The maximum number is 100 but can be changed if necessary in the configuration 
		public var rowsPerPage:uint;
		//Curr Page: Locates the current page.
		public var currPage:uint;
		//Curr Record: Locates the current record.
		public var currRecord:uint;
		//Prev Page: Locates the previous page.
		public var prevPage:uint;
		//Prev Record: Locates the previous record.
		public var prevRecord:uint;
		
		public var totalRecordsChanged:Boolean=false;
		public var totalPagesChanged:Boolean=false;
		public var rowsPerPageChanged:Boolean=false;
		public var currRecordChanged:Boolean=false;
		public var currPageChanged:Boolean=false;
		
		public var firstPageEnabled:Boolean=false;
		public var prevPageEnabled:Boolean=false;
		public var nextPageEnabled:Boolean=false;
		public var lastPageEnabled:Boolean=false;
		
		public var isNavigatorChanged:Boolean=false;
		
		// range of rows in data grid
		public const MAX_ROWS_PER_PAGE:uint = 100;
		public const MIN_ROWS_PER_PAGE:uint = 10;

		
		/**
		 * Construct a page navigator according to total records and rows per page
		 * 
		 *
		 * @param total_records 	uint, total records of a list.
		 * @param rows_per_page		uint, rows per page of a list
		 *
		 * @return 					N/A.
		 *
		 * @see 					N/A
		 */
		public function dmNavigator(total_records:uint=0, rows_per_page:uint=10)
		{
			setNavigator( total_records, rows_per_page, true );
		}
		
		/**
		 * Set the data and field of total records
		 *
		 * 
		 * @param total_records 	int, the number of total records.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setTotalRecords(total_records:int):void
		{
			if ( total_records < 0 )
			{
				total_records = 0;
			}
			
			this.totalRecordsChanged = false;
			if ( this.totalRecords != total_records )
			{
				this.totalRecordsChanged = true;
			}
			this.totalRecords = total_records;
		}
		
		/**
		 * Get the data of total records
		 *
		 * 
		 * @param 				N/A.
		 *
		 * @return 				uint, the number of total records.
		 *
		 * @see 				N/A
		 */
		public function getTotalRecords():uint
		{
			return this.totalRecords;
		}
		
		/**
		 * Set the data and field of rows per page
		 *
		 * 
		 * @param rows_per_page		uint, the number of rows displayed per page.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setRowsPerPage(rows_per_page:uint):void
		{
			if ( rows_per_page < this.MIN_ROWS_PER_PAGE )
			{
				rows_per_page = this.MIN_ROWS_PER_PAGE;
			}
			if ( rows_per_page > this.MAX_ROWS_PER_PAGE )
			{
				rows_per_page = this.MAX_ROWS_PER_PAGE;
			}
			
			this.rowsPerPageChanged = false;
			if ( this.rowsPerPage != rows_per_page )
			{
				this.rowsPerPageChanged = true;
			}
			this.rowsPerPage = rows_per_page;
		}
		
		/**
		 * Get the data of rows per page
		 *
		 * 
		 * @param 				N/A.
		 *
		 * @return 				uint, the number of rows displayed per page.
		 *
		 * @see 				N/A
		 */
		public function getRowsPerPage():uint
		{
			return this.rowsPerPage;
		}
		
		/**
		 * Set the data and field of total pages
		 *
		 * 
		 * @param total_pages		int, the number of total pages.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setTotalPages(total_pages:int):void
		{
			if ( total_pages < 0 )
			{
				total_pages = 0;
			}
			
			this.totalPagesChanged = false;
			if ( this.totalPages != total_pages )
			{
				this.totalPagesChanged = true;
			}
			this.totalPages = total_pages;
		}
		
		/**
		 * Get the data of total pages
		 *
		 * 
		 * @param 				N/A.
		 *
		 * @return 				uint, the number of total pages.
		 *
		 * @see 				N/A
		 */
		public function getTotalPages():uint
		{
			return this.totalPages;
		}
		
		/**
		 * Set the data and field of current page
		 *
		 * 
		 * @param curr_page			int, the current page number.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setCurrentPage(curr_page:int):void
		{
			if ( this.totalPages > 0 )
			{
				if ( curr_page > this.totalPages )
				{
					curr_page = this.totalPages;
				}
				if ( curr_page <= 0 )
				{
					curr_page = 1;
				}
			}
			else
			{
				curr_page = 0;
			}
			
			this.currPageChanged = false;
			if ( this.currPage != curr_page )
			{
				this.currPageChanged = true;
			}
			this.currPage = curr_page;
		}
		
		/**
		 * Get the data of current page
		 *
		 * 
		 * @param 				N/A.
		 *
		 * @return 				uint, the current page number.
		 *
		 * @see 				N/A
		 */
		public function getCurrentPage():uint
		{
			return this.currPage;
		}
		
		/**
		 * Set the data and field of current record
		 *
		 * 
		 * @param curr_record		int, the current record number.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setCurrentRecord(curr_record:int):void
		{
			if ( this.totalRecords > 0 )
			{
				if ( curr_record > this.totalRecords )
				{
					curr_record = this.totalRecords;
				}
				if ( curr_record <= 0 )
				{
					if ( this.currPage > 0)
					{
						curr_record = 1;
					}
					else
					{
						curr_record = 0;
					}
				}
			}
			else
			{
				curr_record = 0;
			}
			
			this.currRecordChanged = false;
			if ( this.currRecord != curr_record )
			{
				this.currRecordChanged = true;
			}
			this.currRecord = curr_record;
		}
		
		/**
		 * Get the data of current record
		 *
		 * 
		 * @param 				N/A.
		 *
		 * @return 				uint, the current record number.
		 *
		 * @see 				N/A
		 */
		public function getCurrentRecord():uint
		{
			return this.currRecord;
		}
		
		/**
		 * Adjust the current record when current page is changed in a page navigator
		 *
		 * 
		 * @param current_page		int, the number of current page in a list.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function adjustCurrentRecord(current_page:int):void
		{
			// adjust the current page first
			this.setCurrentPage( current_page );
			
			var current_record:uint;
			current_record = this.getCurrentRecord();
			if (currPage > 0)
			{
				var pos:uint;
				pos = current_record%rowsPerPage;
				if ( pos == 0 )
				{
					pos = rowsPerPage;
				}
				current_record = (currPage-1)*rowsPerPage + pos;
			}
			else
			{
				current_record = 0;
			}
			this.setCurrentRecord( int(current_record) );
		}
		
		/**
		 * Adjust the current page when current record is changed in a page navigator
		 *
		 * 
		 * @param current_record	int, the number of current record in a list.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function adjustCurrentPage(current_record:int):void
		{
			// adjust the current record first
			this.setCurrentRecord( current_record );
			
			// adjust the current page
			var current_page:int;
			current_page = tools.getDivisionQuotient( this.currRecord, this.rowsPerPage );
			this.setCurrentPage( current_page );
		}
		
		/**
		 * adjust the data and fields of current record and current page
		 *
		 * 
		 * @param total_pages	uint, the number of total pages.
		 * @param is_reset		Boolean, true, reset to page 1 and record 1.
		 *
		 * @return 				void.
		 *
		 * @see 				N/A
		 */
		public function adjustCurrentFields(total_pages:uint, is_reset:Boolean=false):void
		{
			if ( is_reset == true )
			{
				// currRecord
				this.setCurrentRecord( 1 );
				//this.prevRecord = 1;
				
				// currPage
				this.setCurrentPage( 1 );
				//this.prevPage = 1;
			}
			else
			{
				// currRecord and currPage
				var current_record:uint;
				current_record = this.getCurrentRecord();
				this.adjustCurrentPage( int(current_record) );
			}
		}
		
		/**
		 * adjust the data and fields of total pages, current record and current page
		 *
		 * 
		 * @param is_reset		Boolean, true, reset to page 1 and record 1.
		 *
		 * @return 				void.
		 *
		 * @see 				N/A
		 */
		public function adjustNavigator(is_reset:Boolean=false):void
		{
			// totalPages
			var total_pages:uint;
			total_pages = tools.getDivisionQuotient( this.totalRecords, this.rowsPerPage );
			this.setTotalPages( int(total_pages) );
			
			this.adjustCurrentFields( total_pages, is_reset );
			
			this.updateNavigatorFlags();
		}
		
		/**
		 * Set the data and fields of a page navigator according to total records and rows per page
		 * 
		 *
		 * @param total_records 	uint, total records of a list.
		 * @param rows_per_page		uint, rows per page of a list
		 * @param is_reset			Boolean, true, reset to page 1 and record 1.
		 *
		 * @return 					void.
		 *
		 * @see 					N/A
		 */
		public function setNavigator(total_records:uint=0, rows_per_page:uint=10, is_reset:Boolean=false):void
		{
			// rowsPerPage
			this.setRowsPerPage( rows_per_page );
			
			// totalRecords
			this.setTotalRecords( total_records );
			
			this.adjustNavigator( is_reset );
		}

		public function updateNavigatorFlags():void
		{
			if ( currPage <= 1 )
			{
				firstPageEnabled = false;
				prevPageEnabled = false;
				nextPageEnabled = true;
				lastPageEnabled = true;
			}
			else if ( currPage >= totalPages )
			{
				firstPageEnabled = true;
				prevPageEnabled = true;
				nextPageEnabled = false;
				lastPageEnabled = false;
			}
			else
			{
				firstPageEnabled = true;
				prevPageEnabled = true;
				nextPageEnabled = true;
				lastPageEnabled = true;
			}
			
			if ( totalPages <= 1 )
			{
				firstPageEnabled = false;
				prevPageEnabled = false;
				nextPageEnabled = false;
				lastPageEnabled = false;
			}
		}
		
		public function onTotalRecordsChanged(total_records:uint):void
		{
			trace("=====================onTotalRecordsChanged");
			totalRecords = total_records;
			
			this.adjustNavigator( false );
		}
		
		public function onTotalPagesChanged(total_pages:uint):void
		{
			trace("=====================onTotalPagesChanged");
			totalPages = total_pages;
			
			this.adjustCurrentFields( this.totalPages, false );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function onRowsPerPageChanged(rows_per_page:uint):void
		{
			trace("=====================onRowsPerPageChanged");
			rowsPerPage = rows_per_page;
			
			this.adjustNavigator( false );
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function onCurrPageChanged(curr_page:uint):void
		{
			trace("=====================onCurrPageChanged");
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			
			currPage = curr_page;
			
			this.adjustCurrentRecord( int(currPage) );		
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function onCurrRecordChanged(current_record:uint):void
		{
			trace("=====================onCurrRecordChanged");
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			
			this.adjustCurrentPage( int(current_record) );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function goToFirstPage():void
		{
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			if ( totalPages > 0 )
			{
				currPage = 1;
			}
			else
			{
				currPage = 0;
			}
			this.adjustCurrentRecord( int(currPage) );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function goToLastPage():void
		{
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			if ( totalPages > 0 )
			{
				currPage = totalPages;
			}
			else
			{
				currPage = 0;
			}
			this.adjustCurrentRecord( int(currPage) );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		public function goToPrevPage():void
		{
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			if ( totalPages > 0 )
			{
				if ( currPage > 1 )
				{
					currPage -= 1;
				}
				else
				{
					currPage = 1;
				}
			}
			else
			{
				currPage = 0;
			}
			this.adjustCurrentRecord( int(currPage) );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
		/**
		 * 
		 * 
		 */
		public function goToNextPage():void
		{
			this.prevPage = this.currPage;
			this.prevRecord = this.currRecord;
			if ( totalPages > 0 )
			{
				if ( currPage < totalPages )
				{
					currPage += 1;
				}
				else
				{
					currPage = totalPages;
				}
			}
			else
			{
				currPage = 0;
			}
			this.adjustCurrentRecord( int(currPage) );
			this.updateNavigatorFlags();
			
			if ( this.prevPage != this.currPage )
			{
				this.isNavigatorChanged = true;
			}
		}
		
	}
}