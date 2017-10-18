<template>
	<div id="container">
		<header-menu></header-menu>
		<sign-menu></sign-menu>
		<div class="content">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="方向">
					<el-select placeholder="方向" v-model="formData.class">
						<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="组别">
					<el-select placeholder="组别" v-model="formData.group">
						<el-option v-for="item in group_names" :label="item.group_name" :value="item.id" :key="item.id"></el-option>
      				
					</el-select>
				</el-form-item>

				<el-form-item label="姓名" >
					<el-input placeholder="请输入内容" v-model.trim="formData.name"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
            <!-- <el-button type="primary" @click="onExport">导出</el-button> -->
				</el-form-item>
			</el-form>

			<el-table :data="leave_users" border style="width: 100%">
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="group_id" label="组别"></el-table-column>
				<el-table-column prop="number" label="本月请假次数"></el-table-column>
			</el-table>



		</div>
	</div>
</template>

<script>

  export default {
    data() {
      return {
      	formData: {
      		class:'',
      		group:'',
      		name:''
      	},
        options: [
        	{
        		label:'开发',value:0
        	},
        	{
        		label:'Python',value:1
        	},
        	{
        		label:'美工',value:2
        	}
        ],
        group_names:{},
        leave_users:[]

      }
    },
    methods: {
      select_class(val) {
          for(var i=0;i<this.options.length;i++) {
            if(val == this.options[i].value) {
                return this.options[i].label;break;
            }
          }
      },
      onSubmit() {
        console.log(this.formData.class);
        this.$http.post('/his_select',{
            'class_name' : this.formData.class,
            'group_id'   : this.formData.group,
            'user_name'  : this.formData.name
        }).then(
        function(response) {
          var data = response.data;
          this.leave_users = data;
        }).then(
        function(response) {
            var data = response.data;
             
            if(data.code == 1) {
              this.$message({
                    showClose:true,
                    message: data.msg,
                    type:'error'
              });
            }
            else {
                this.leave_users = data;
            }
        })
      },
      onExport() {
        console.log('nininin');
        this.$http.post('/export');
      }
    },
    watch: {
    	'formData.class': {
    		handler:function(val,oldval) {
    			// if(val == oldval) return false;

    			this.formData.group = '';

    			this.$http.post('/grouphis',{
    				'classid':val
    			}).then(
    				function(response) {
    					var data = response.data;
    					this.group_names = data;
    				}
    			)
    		},
    		deep:true
    	}
    },
   	created:function() {
   		this.$http.post('/leave_select').then(
   				function(response) {
   					var data = response.data;
   					this.leave_users = data;
   					console.log(data);
   				}
   			)
   	}

  }
	
</script>

<style>
	.content {
		margin: 10px 0;
	}
</style>