<?php


namespace App\Http\Controllers\leave;

use App\Http\Controllers\sms\smsController;

use App\Http\Controllers\Controller;


use Illuminate\Http\Request;

use DB;

class leaveController extends Controller
{

	public static $sms_demo = null;

	public static function sms_db() {
		if(self::$sms_demo == null) {

			self::$sms_demo = new smsController();

		}

		return self::$sms_demo;
	}

	public function leave(Request $request) {

		$name = trim($request->name);

		$group_id = trim($request->group);

		$user_reason = trim($request->reason);

		$end_time = strtotime($request->endDate.' '.$request->endTime);

		$start_time = strtotime($request->startDate.' '.$request->startTime);

		if(strlen($name) ==0  || strlen($group_id)==0 || strlen($user_reason) ==0 || strlen($end_time) ==0 || strlen($start_time) == 0) {
			return json_encode(['code'=>1,'msg' => '请将信息填写完整']);
		}

		if($start_time<time() || $end_time<time() || $start_time>=$end_time) {
			return json_encode(['code'=>1,'msg'=>'请假时间不合理']);
		}

		$leave_user = [
			'name'       =>  $name,
			'group_id'   =>  $group_id,
			'reason'     =>  $user_reason,
			'startDate'  =>  $start_time,
			'endDate'    =>  $end_time
		];

		$user_id = DB::table('leaveData')
		->insertGetId($leave_user);
		
		if($user_id) {
			$this->sms_send($leave_user);

			return json_encode(['code'=>0,'msg'=>'报名成功']);
		}
	}

	public function sms_send($leave_user) {
		$select_group = DB::table('groups')
		->where('id','=',$leave_user['group_id'])
		->first();
		
		$sms_sign = [
			'group_name'     =>   $select_group->group_name,
			'group_user'     =>   $select_group->user_name,
			'user_name'      =>   $leave_user['name'],
			'start_time'     =>   date("Y-m-d H:m:s",$leave_user['startDate']),
			'end_time'       =>   date("Y-m-d H:m:s",$leave_user['endDate'])
		];
		echo $select_group->user_phone;
		leaveController::sms_db()->sendSms($select_group->user_phone,$sms_sign);

	}


	public function  group_select(Request $request) {

		 $class_id = trim($request->classid);

		 $select_group = DB::table('groups')
		 ->where('class_id','=',$class_id)
		 ->get();


		return $select_group;

	}
}
