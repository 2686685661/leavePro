<?php

namespace App\Http\Controllers\Excel;

use App\Http\Controllers\Controller;


use Illuminate\Http\Request;

use Excel;

use DB;

class excelController extends Controller
{
	public $group = [];

	public function export() {
		$int = 1;
		$exe_name=date('Y年m月',time()).'请假次数名单';
		$cellData = [
			['序号','姓名','组别','本月请假次数']
		];

		$select = DB::table('leaveData')
                    ->select(DB::raw('count(name) as number, name,group_id'))
                    ->groupBy('name','group_id')
                    ->orderBy('number','desc')
                    ->get()->map(function($value) {
                     	$value->group_id = $this->group_name($value->group_id);
                     	return $value;
                    });
        foreach ($select as $user) {
        	
        	$cellData[] = [
        		$int,
        		$user->name,
        		$user->group_id,
        		$user->number
        	];
        	$int++;
        }
        Excel::create("$exe_name",function($excel) use ($cellData){
            $excel->sheet('score', function($sheet) use ($cellData){
                $sheet->rows($cellData);
            });
        })->store('xls',storage_path('excel/exports'))->export('xls');
       	
        return true;




    }

    public function exportAll() {
    	$int = 1;
    	$exe_name=date('Y年m月',time()).'请假具体信息名单';
		$cellData = [
			['序号','姓名','组别','请假开始日期','请假结束时间','请假理由']
		];

		$select = DB::table('leaveData')
					->orderBy('name','desc')
					->get()->map(function($value){
						$value->group_id = $this->group_name($value->group_id);
						$value->startDate = date('Y-m-d H:m:s',$value->startDate);
						$value->endDate = date('Y-m-d H:m:s',$value->endDate);
						return $value;
					});

		foreach ($select as $user) {
			$cellData[] = [
				$int,
				$user->name,
				$user->group_id,
				$user->startDate,
				$user->endDate,
				$user->reason
			];
			$int++;
		}
        Excel::create("$exe_name",function($excel) use ($cellData){
            $excel->sheet('score', function($sheet) use ($cellData){
                $sheet->rows($cellData);
            });
        })->store('xls',storage_path('excel/exportAll'))->export('xls');

        return true;		

    }

    public function group_name($group_id) {
		if(count($this->group)<1) {
			$select = DB::table('groups')->pluck('group_name','id')->toArray();
			$this->group = $select;
		}
		foreach($this->group as $id => $group_name) {
			if($id == $group_id) {
				return $group_name;
				break;
			}
		}
	}

}