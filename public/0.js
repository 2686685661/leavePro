webpackJsonp([0],{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(134)
}
var normalizeComponent = __webpack_require__(8)
/* script */
var __vue_script__ = __webpack_require__(136)
/* template */
var __vue_template__ = __webpack_require__(137)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Leave/leaveIn.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] leaveIn.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53b7dcec", Component.options)
  } else {
    hotAPI.reload("data-v-53b7dcec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("a8d07894", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-53b7dcec\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./leaveIn.vue", function() {
     var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-53b7dcec\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./leaveIn.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "\n.content {\n\tmargin: 10px 0;\n}\n.my_submit {\n\t  width: 100%;\n}\n.juzhong {\n\ttext-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			formData: {
				name: '',
				category: '',
				group: '',
				startDate: '',
				startTime: '',
				endDate: '',
				endTime: '',
				reason: ''
			},
			rules: {
				name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
				category: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
				group: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
				date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				time: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
				reason: [{ required: true, message: '请填写活动形式', trigger: 'blur' }, { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }]
			},
			options: [{
				label: '开发', value: 0
			}, {
				label: 'Python', value: 1
			}, {
				label: '美工', value: 2

			}],
			group_names: {}
		};
	},
	watch: {
		'formData.category': {
			handler: function handler(val, oldval) {
				if (val == '' || val == oldval) return false;

				this.formData.group = '';

				this.$http.post('/groups', {
					'classid': this.select_value(val)
				}).then(function (response) {

					var data = response.data;
					console.log(data);
					this.group_names = data;
				});
			},
			deep: true
		}
	},
	methods: {
		set_startDate: function set_startDate(val) {
			this.formData.startDate = val;
		},
		set_endDate: function set_endDate(val) {
			this.formData.endDate = val;
		},
		select_value: function select_value(label) {
			for (var i = 0; i < this.options.length; i++) {

				if (this.options[i].label == label) {
					return this.options[i].value;
					break;
				}
			}
		},
		test: function test() {
			var reg_name = /^[\u4E00-\u9FA5]{2,4}$/;

			if (!reg_name.test(this.formData.name)) {
				this.$message({
					showClose: true,
					message: '姓名错误，请重新填写',
					type: 'warning'
				});
			} else if (this.formData.category == '') {
				this.$message({
					showClose: true,
					message: '请选择方向',
					type: 'warning'
				});
			} else if (this.formData.group == '') {
				this.$message({
					showClose: true,
					message: '请选择组别',
					type: 'warning'
				});
			} else if (this.formData.startDate == '') {
				this.$message({
					showClose: true,
					message: '请选择开始日期',
					type: 'warning'
				});
			} else if (this.formData.startTime == '') {
				this.$message({
					showClose: true,
					message: '请选择开始时间',
					type: 'warning'
				});
			} else if (this.formData.endDate == '') {
				this.$message({
					showClose: true,
					message: '请选择结束日期',
					type: 'warning'
				});
			} else if (this.formData.endTime == '') {
				this.$message({
					showClose: true,
					message: '请选择结束时间',
					type: 'warning'
				});
			} else if (this.formData.reason.length < 2 || this.formData.reason.length > 50) {
				this.$message({
					showClose: true,
					message: '请规范书写申请理由',
					type: 'warning'
				});
			} else {
				return true;
			}
			return false;
		},
		set_time: function set_time(val) {
			var hour = val.getHours();
			var minutes = val.getMinutes();
			var second = val.getSeconds();

			return hour + ":" + minutes + ":" + second;
		},
		onSubmit: function onSubmit() {
			if (this.test()) {
				this.formData.startTime = this.set_time(this.formData.startTime);
				this.formData.endTime = this.set_time(this.formData.endTime);
				this.$http.post('/leave', {
					name: this.formData.name,
					group: this.formData.group,
					startDate: this.formData.startDate,
					startTime: this.formData.startTime,
					endDate: this.formData.endDate,
					endTime: this.formData.endTime,
					reason: this.formData.reason
				}).then(function (response) {
					console.log(response);
					var data = response.data;
					if (data.code == 0) {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
					}
				});
			}
		}
	}
});

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "container" } },
    [
      _c("header-menu"),
      _vm._v(" "),
      _c("sign-menu"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content" },
        [
          _c(
            "el-form",
            {
              ref: "formData",
              staticClass: "demo-ruleForm",
              attrs: {
                "label-width": "80px",
                model: _vm.formData,
                rules: _vm.rules
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "姓名", prop: "name" } },
                [
                  _c("el-input", {
                    attrs: { size: "small" },
                    model: {
                      value: _vm.formData.name,
                      callback: function($$v) {
                        _vm.formData.name =
                          typeof $$v === "string" ? $$v.trim() : $$v
                      },
                      expression: "formData.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "类别", prop: "category" } },
                [
                  _c(
                    "el-radio-group",
                    {
                      model: {
                        value: _vm.formData.category,
                        callback: function($$v) {
                          _vm.formData.category = $$v
                        },
                        expression: "formData.category"
                      }
                    },
                    _vm._l(_vm.options, function(item) {
                      return _c("el-radio", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "组别", prop: "group" } },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择组别" },
                      model: {
                        value: _vm.formData.group,
                        callback: function($$v) {
                          _vm.formData.group = $$v
                        },
                        expression: "formData.group"
                      }
                    },
                    _vm._l(_vm.group_names, function(item) {
                      return _c("el-option", {
                        key: item.id,
                        attrs: { label: item.group_name, value: item.id }
                      })
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "开始时间", required: "" } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 10 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { prop: "date" } },
                        [
                          _c("el-date-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "date", placeholder: "选择日期" },
                            on: { change: _vm.set_startDate },
                            model: {
                              value: _vm.formData.startDate,
                              callback: function($$v) {
                                _vm.formData.startDate = $$v
                              },
                              expression: "formData.startDate"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("el-col", { staticClass: "line", attrs: { span: 1 } }, [
                    _c("div", { staticStyle: { "text-align": "center" } }, [
                      _vm._v("--")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 10 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { prop: "time" } },
                        [
                          _c("el-time-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "fixed-time", placeholder: "选择时间" },
                            model: {
                              value: _vm.formData.startTime,
                              callback: function($$v) {
                                _vm.formData.startTime = $$v
                              },
                              expression: "formData.startTime"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "结束时间", required: "" } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 10 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { prop: "date" } },
                        [
                          _c("el-date-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "date", placeholder: "选择日期" },
                            on: { change: _vm.set_endDate },
                            model: {
                              value: _vm.formData.endDate,
                              callback: function($$v) {
                                _vm.formData.endDate = $$v
                              },
                              expression: "formData.endDate"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("el-col", { staticClass: "line", attrs: { span: 1 } }, [
                    _c("div", { staticStyle: { "text-align": "center" } }, [
                      _vm._v("--")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 10 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { prop: "time" } },
                        [
                          _c("el-time-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "fixed-time", placeholder: "选择时间" },
                            model: {
                              value: _vm.formData.endTime,
                              callback: function($$v) {
                                _vm.formData.endTime = $$v
                              },
                              expression: "formData.endTime"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { span: 10, label: "活动形式", prop: "reason" } },
                [
                  _c("el-input", {
                    attrs: { type: "textarea", size: "small" },
                    model: {
                      value: _vm.formData.reason,
                      callback: function($$v) {
                        _vm.formData.reason =
                          typeof $$v === "string" ? $$v.trim() : $$v
                      },
                      expression: "formData.reason"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              staticClass: "my_submit",
              attrs: { type: "primary" },
              on: { click: _vm.onSubmit }
            },
            [_vm._v("申请")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("footer-menu")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-53b7dcec", module.exports)
  }
}

/***/ })

});