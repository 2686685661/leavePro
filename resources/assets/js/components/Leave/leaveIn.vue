<template>
	<div id="container">
		<header-menu></header-menu>
		<sign-menu></sign-menu>
		<div class="content">
			<el-form label-width="80px" class="demo-ruleForm" :model="formData" :rules="rules" ref="formData">

				<el-form-item label="姓名" prop="name">
					<el-input v-model.trim="formData.name" size="small"></el-input>
				</el-form-item>

				<el-form-item label="类别" prop="category">
					<el-radio-group v-model="formData.category" >
						<el-radio v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-radio>
					</el-radio-group>
				</el-form-item>

				 <el-form-item label="组别" prop="group">
				 	<el-select placeholder="请选择组别" v-model="formData.group">
				 		<el-option v-for="item in group_names" :label="item.group_name" :value="item.id" :key="item.id"></el-option>
				 	</el-select>
				 </el-form-item>

				<el-form-item label="开始时间" required>
					 <el-col :span="10">
					 	<el-form-item prop="date">
					 		<el-date-picker type="date" @change="set_startDate" placeholder="选择日期" style="width: 100%;" v-model="formData.startDate" ></el-date-picker>
					 	</el-form-item>
					 </el-col>
					 <el-col class="line" :span="1"><div style="text-align:center">--</div></el-col>
					  <el-col :span="10">
					  	<el-form-item prop="time">
					  		<el-time-picker type="fixed-time" placeholder="选择时间" style="width: 100%;" v-model="formData.startTime" ></el-time-picker>
					  	</el-form-item>
					  </el-col>
				</el-form-item>

				<el-form-item label="结束时间" required>
					<el-col :span="10">
					 	<el-form-item prop="date">
					 		<el-date-picker type="date" @change="set_endDate" placeholder="选择日期" style="width: 100%;" v-model="formData.endDate"></el-date-picker>
					 	</el-form-item>
					</el-col>
					<el-col class="line"  :span="1"><div style="text-align:center">--</div></el-col>
					 <el-col :span="10">
					<el-form-item prop="time">
					  	<el-time-picker type="fixed-time" placeholder="选择时间" style="width: 100%;" v-model="formData.endTime"></el-time-picker>
					  	</el-form-item>
					</el-col>
				</el-form-item>

				 <el-form-item :span="10" label="活动形式" prop="reason">
				 	<el-input type="textarea" v-model.trim="formData.reason" size="small"></el-input>
				 </el-form-item>
			</el-form>
			<el-button class="my_submit" type="primary" @click="onSubmit">申请</el-button>

		</div>
		<footer-menu></footer-menu>	
	</div>

</template>

<script>
	export default {
		data:function() {
			return {
				formData:{
					name:'',
					category:'',
					group:'',
					startDate:'',
					startTime:'',
					endDate:'',
					endTime:'',
					reason:''
				},
				rules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					category: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					group: [
						 { required: true, message: '请选择活动区域', trigger: 'change' }
					],
					date: [
						 { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					time: [
						 { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					reason: [
						 { required: true, message: '请填写活动形式', trigger: 'blur' },
						 { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
					]
				},
				options: [
					{
						label: '开发', value: 0
					},
					{
						label: 'Python', value: 1
					},
					{
						label: '美工', value: 2

					}

				],
				group_names:{}
			}
		},
		watch: {
			'formData.category': {
				handler:function(val,oldval) {
					if(val == '' || val == oldval) return false;

					this.formData.group = '';


					this.$http.post('/groups',{
						'classid' : this.select_value(val)
					}).then(
						function(response) {
							
							var data = response.data;
							console.log(data);
							this.group_names = data;
						}

					);
				},
				deep:true
			}
		},
		methods:{
			set_startDate(val) {
				this.formData.startDate = val;
			},
			set_endDate(val) {
				this.formData.endDate = val;
			},
			select_value(label) {
				for(var i=0;i<this.options.length;i++) {

					if(this.options[i].label == label) {
						return this.options[i].value;
						break;
					}
				}
			},
			test() {
				var reg_name    = /^[\u4E00-\u9FA5]{2,4}$/;

				if(!reg_name.test(this.formData.name)) {
					this.$message({
                        showClose: true,
                        message: '姓名错误，请重新填写',
                        type: 'warning'
                    });
				}
				else if(this.formData.category =='') {
					this.$message({
						showClose:true,
						message: '请选择方向',
						type:'warning'
					});
				}
				else if(this.formData.group == '') {
					this.$message({
						showClose:true,
						message:'请选择组别',
						type:'warning'
					});
				}
				else if(this.formData.startDate == '') {
					this.$message({
						showClose:true,
						message: '请选择开始日期',
						type:'warning'
					});
				}
				else if(this.formData.startTime == '') {
					this.$message({
						showClose:true,
						message: '请选择开始时间',
						type:'warning'
					});
				}
				else if(this.formData.endDate == '') {
					this.$message({
						showClose:true,
						message: '请选择结束日期',
						type:'warning'
					});
				}
				else if(this.formData.endTime == '') {
					this.$message({
						showClose:true,
						message: '请选择结束时间',
						type:'warning'
					});
				}
				else if(this.formData.reason.length<2 || this.formData.reason.length>50) {
					this.$message({
						showClose:true,
						message: '请规范书写申请理由',
						type:'warning'
					});
				}
				else {
					return true;
				}
				return false;
			},

			set_time(val) {
				var hour = val.getHours(); 
				var minutes = val.getMinutes(); 
				var second = val.getSeconds();

				return hour+":"+minutes+":"+second;
			},
			onSubmit() {
				if(this.test()) {
					this.formData.startTime = this.set_time(this.formData.startTime);
					this.formData.endTime = this.set_time(this.formData.endTime);
					this.$http.post('/leave',{
						name      :  this.formData.name,
						group     :  this.formData.group,
						startDate :  this.formData.startDate,
						startTime :  this.formData.startTime,
						endDate   :  this.formData.endDate,
						endTime   :  this.formData.endTime,
						reason    :  this.formData.reason
					}).then(
						function(response) {
							console.log(response);
							var data = response.data;
							if(data.code ==0) {
								this.$message({
									showClose:true,
									message: data.msg,
									type:'success'
								});
							}
							else {
								this.$message({
									showClose:true,
									message: data.msg,
									type:'error'
								});
							}
						}
					)
				}
			}
		}
	}
</script>

<style>
	.content {
		margin: 10px 0;
	}
	.my_submit {
		  width: 100%;
	}
	.juzhong {
		text-align: center;
	}
</style>

