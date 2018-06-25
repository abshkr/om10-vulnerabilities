<?php
interface IdmpDatastore{
	
	public function connect($params = FALSE);
	public function create($params = FALSE);
	public function retrieve($params = FALSE);
	public function update($params = FALSE);
	public function delete($params = FALSE);
	public function interpretConditions($params = FALSE);
	
}
?>