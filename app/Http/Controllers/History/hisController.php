<?php

namespace App\Http\Controllers\History;

// use App\Http\Controllers\sms\smsController;

use App\Http\Controllers\Controller;


use Illuminate\Http\Request;

use DB;

class hisController extends Controller
{
	public $group = [];

	public function group_select(Request $request) {

		$class_id = trim($request->classid);

		 $select_group = DB::table('groups')
		 ->where('class_id','=',$class_id)
		 ->get();

		return $select_group;
	}

	public function leave_select() {


		$select = DB::table('leaveData')
					->select(DB::raw('where FROM_UNIXTIME(startDate,%Y%m)=FROM_UNIXTIME(now(),%Y%m)'))
                    ->select(DB::raw('count(name) as number, name,group_id'))
                    ->groupBy('name','group_id')
                    ->orderBy('number','desc')
                    ->orderBy('name','desc')
                    ->get()->map(function($value) {
                     	$value->group_id = $this->group_name($value->group_id);
                     	return $value;
                    });

		return $select;
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

	public function his_select(Request $request) {

		$select =null;
		$input = $request->all();

		if(strlen($input['class_name']) != 0 && strlen($input['group_id']) ==0 && strlen(trim($input['user_name'])) ==0) {

			$select = DB::table('groups')
			->where('class_id','=',$input['class_name'])
			->join('leaveData','groups.id','=','leaveData.group_id')
			->select(DB::raw('where FROM_UNIXTIME(leaveData.startDate,%Y%m)=FROM_UNIXTIME(now(),%Y%m)'))
			->select(DB::raw('count(name) as number, name,group_id'))
			->groupBy('name','group_id')
            ->orderBy('number','desc')
            ->orderBy('name','desc')
			->get()->map(function($value) {
                $value->group_id = $this->group_name($value->group_id);
                return $value;
                });
			
		}

		else if(strlen($input['class_name']) != 0 && strlen($input['group_id']) !=0 && strlen(trim($input['user_name'])) ==0) {
			$select = DB::table('leaveData')
			->where('group_id','=',$input['group_id'])
			->select(DB::raw('where FROM_UNIXTIME(startDate,%Y%m)=FROM_UNIXTIME(now(),%Y%m)'))
			->select(DB::raw('count(name) as number, name,group_id'))
			->groupBy('name','group_id')
            ->orderBy('number','desc')
            ->orderBy('name','desc')
			->get()->map(function($value) {
                $value->group_id = $this->group_name($value->group_id);
                return $value;
                });

		}

		else if(strlen($input['class_name']) != 0 && strlen($input['group_id']) !=0 && strlen(trim($input['user_name'])) !=0) {
			$select = DB::table('leaveData')
			->where('group_id','=',$input['group_id'])
			->where('name','=',$input['user_name'])
			->select(DB::raw('where FROM_UNIXTIME(startDate,%Y%m)=FROM_UNIXTIME(now(),%Y%m)'))
			->select(DB::raw('count(name) as number, name,group_id'))
			->groupBy('name','group_id')
            ->orderBy('number','desc')
            ->orderBy('name','desc')
			->get()->map(function($value) {
                $value->group_id = $this->group_name($value->group_id);
                return $value;
                });
		}
		else if(strlen($input['class_name']) == 0 && strlen($input['group_id']) ==0 && strlen(trim($input['user_name'])) !=0) {
			$select = DB::table('leaveData')
			->where('name','=',$input['user_name'])
			->select(DB::raw('where FROM_UNIXTIME(startDate,%Y%m)=FROM_UNIXTIME(now(),%Y%m)'))
			->select(DB::raw('count(name) as number, name,group_id'))
			->groupBy('name','group_id')
            ->orderBy('number','desc')
            ->orderBy('name','desc')
			->get()->map(function($value) {
                $value->group_id = $this->group_name($value->group_id);
                return $value;
                });
		}
		else if(strlen($input['class_name']) == 0 && strlen($input['group_id']) ==0 && strlen(trim($input['user_name'])) ==0) {
			$select = $this->leave_select();
		}
		else {
			$select = json_encode(['code'=>1,'msg'=>'error!']);
		}

		return $select;

	}

}
