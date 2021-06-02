import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';
type NewType = string;
/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('取消重复请求'); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};

class ApiServe {
  private url: NewType = '';
  // private baseURL: NewType = 'http://192.168.3.130:10000';
  private baseURL: NewType = 'http://api.365tskj.com';
  private myhttp = window.location.href.replace('#','%23');
  private toUrl = `${this.baseURL}/wechat-platform/oauth2/wxOauth2/?appId=wx1c73e29ac42878a0&redirectUrl=` + this.myhttp; // 线上
  private timeout?: number | undefined = 5000;
  private headers: any = { ' idss': '111' };
  private serve = axios.create({
    baseURL: this.baseURL,
    timeout: this.timeout,
  });
  private mesg = '服务器出错';
  private  tokens: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzZXMiOiIiLCJ1c2VyX25hbWUiOiIxODQyMzA3NTkzOSIsIm9wZW5JZCI6IjEzMDgyNDg5LWEwMWEtNGJlZC1iZTRmLTY4MGU1YTAxNDBjMyIsInVzZXJJZCI6IjE5OTQ2Nzk1NDM2MDk4MzU1MiIsImF1dGhvcml0aWVzIjpbIklERU5USVRZX0RPQ1RPUl9NQU5BR0VSIl0sImNsaWVudF9pZCI6InRlc3Qtd2ViIiwiYXVkIjpbInVzZXItY2VudGVyIiwiYXV0aC1jZW50ZXIiXSwiaWRlbnRpdGllcyI6Ilt7XCJpZFwiOjE5OTQ2Nzk1NTM1OTIyNzkwNCxcImlkZW50aXR5VHlwZVwiOjUsXCJpZGVudGl0eUNvZGVcIjpcIkRPQ1RPUl9NQU5BR0VSXCIsXCJvcmdJZFwiOjY4LFwiZGVwdElkXCI6MSxcImFyZWFJZFwiOm51bGwsXCJpcGxcIjpudWxsfV0iLCJvcmdJZHMiOiI2OCIsInBob25lIjoiMTg0MjMwNzU5MzkiLCJzY29wZSI6WyJVU0VSX0lORk8iLCJBVVRIT1JJVFlfQ09ERSIsIkhFQUxUSF9JTkZPIiwiVVNFUl9NT1RJRlkiLCJVU0VSX0RFVEFJTFNfSU5GTyJdLCJkZXB0SWRzIjoiMSIsImV4cCI6MTU5NDA2NDU2MywianRpIjoiMDRjOTY2NGEtZjkwMi00MjEwLTk0ZTAtN2NlNmUzNzkyMmM0IiwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiMTg0MjMwNzU5MzkifQ.2wiutatRnCOqfOr0GOwhIQqtBU2qZCxGN6dGKqqmixI';
  // get请求
  public get(url: string, data: object | null, Callback: any) {
    this.SetConfig();
    this.SetResponse();
    this.serve.get(url, { params: data }).then((res: any) => {
      // tslint:disable-next-line:no-shadowed-variable
      Callback(res);
    }).catch((res: any) => {
      // Toast.fail(this.mesg);
      console.log('请求错误信息', res);
    });
  }
  // post请求
  public post(url: string, data: object | null, Callback: any) {
    this.SetConfig();
    this.SetResponse();
    this.serve.post(url, data).then((res) => {
      // tslint:disable-next-line:no-shadowed-variable
      Callback(res);
    }).catch((res) => {
      // Toast.fail(this.mesg);
      console.log('错误信息', res);
    });
  }
  
 
 

  public SetConfig(): void {
    const baseURL: NewType = 'http://api.365tskj.com';
    const myhttp = window.location.href.replace('#','%23');
    const toUrl = `${this.baseURL}/wechat-platform/oauth2/wxOauth2/?appId=wx1c73e29ac42878a0&redirectUrl=` + this.myhttp; // 线上
    // /* request拦截器 */
    this.serve.interceptors.request.use(
      // tslint:disable-next-line:no-unused-expression
      (config: any) => {
        // neverCancel 配置项，允许多个请求
        if (!config.neverCancel) {
          // 生成cancelToken
          // config.cancelToken = new CancelToken((c: any) => {
          //   removePending(config, c);
          // });
        }
        // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
        config.headers.Authorization = this.tokens;
        // config.headers.hhy = '555';
        // config.headers['X-SessionId'] = '222';
        // if (store.getters.sessionId) {
        //   config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
        // }
        let tak: any = '';
        // 本地
        // tak = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzZXMiOiIxLT4xMCwyLT4xMC0tLTEyLDMtPm51bGwsIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJvcGVuSWQiOiJ3UzE1NjQxU3NkZl8xNTYxNGdzIiwidXNlcklkIjoiMTk0MjE1MTUxNTE5MTU0MSIsImF1dGhvcml0aWVzIjpbIlJPTEVfYyIsIlJPTEVfZCIsIlJPTEVfYSIsIlJPTEVfYiIsIklERU5USVRZX1BBVElFTlQiLCJST0xFX2ciLCJST0xFX2giLCJST0xFX2UiLCJST0xFX2YiLCJJREVOVElUWV9ET0NUT1IiLCJJREVOVElUWV9SRVNJREVOVCJdLCJjbGllbnRfaWQiOiJ0ZXN0LXdlYiIsImF1ZCI6WyJ1c2VyLWNlbnRlciIsImF1dGgtY2VudGVyIl0sImlkZW50aXRpZXMiOiJbe1wiaWRcIjoxLFwiaWRlbnRpdHlUeXBlXCI6MSxcImlkZW50aXR5Q29kZVwiOm51bGwsXCJvcmdJZFwiOm51bGwsXCJkZXB0SWRcIjpudWxsLFwiYXJlYUlkXCI6bnVsbCxcImlwbFwiOm51bGx9LHtcImlkXCI6MixcImlkZW50aXR5VHlwZVwiOjIsXCJpZGVudGl0eUNvZGVcIjpudWxsLFwib3JnSWRcIjpudWxsLFwiZGVwdElkXCI6bnVsbCxcImFyZWFJZFwiOm51bGwsXCJpcGxcIjpudWxsfSx7XCJpZFwiOjMsXCJpZGVudGl0eVR5cGVcIjozLFwiaWRlbnRpdHlDb2RlXCI6bnVsbCxcIm9yZ0lkXCI6bnVsbCxcImRlcHRJZFwiOm51bGwsXCJhcmVhSWRcIjpudWxsLFwiaXBsXCI6bnVsbH1dIiwib3JnSWRzIjoiMTIxMCw2Nyw2OCwxMTAxLDEwOTYiLCJwaG9uZSI6IjEzODg4ODg4ODg4Iiwic2NvcGUiOlsiVVNFUl9JTkZPIiwiQVVUSE9SSVRZX0NPREUiLCJIRUFMVEhfSU5GTyIsIlVTRVJfTU9USUZZIiwiVVNFUl9ERVRBSUxTX0lORk8iXSwiZGVwdElkcyI6IjEwMyIsImV4cCI6MTU5MzczMDk2MiwianRpIjoiMDYwNWMxNjctNjdmYS00ZjJhLWIxYWEtZGQyNzZiODc5YzMwIiwiZW1haWwiOiIzNjVAcXEuY29tIiwidXNlcm5hbWUiOiJhZG1pbiJ9.IESSI11X7Y6jQLCZa9Z5gVL3jPPazrEpFL5-czM3T4E';
        // 线上
        if (sessionStorage.getItem('Authorization') && sessionStorage.getItem('Authorization')!='null') {
          tak = sessionStorage.getItem('Authorization');
        }else{
          //  tak = this.tool.getQueryString('Authorization');
           sessionStorage.setItem('Authorization', tak);
        }
        if (!tak) {
          window.location.href = toUrl;
        }
        config.headers.Authorization = tak;
        return config;
      },
      (error: any) => {
        Promise.reject(error);
      },
    );
  }

  public SetResponse(): void {
    /* respone拦截器 */
    this.serve.interceptors.response.use(
      (response: any) => {
        // 移除队列中的该请求，注意这时候没有传第二个参数f
       // removePending(response.config);
        // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
        if (response.status !== 200) {
          if (response.status === 401) {
            // alert('dddedd')
          }
          return Promise.reject('error');
        } else {
        //   // 请求成功后数据处理
          const responses: any  = response;
        //   if (responses.state === 1) {
        //     if (responses.data) {
        //         responses.data = JSON.parse(responses.data);
        //     }
        //  } else {
        //     if (responses.dataMsg) {
        //       console.log('请求数出错', responses.dataMsg);
        //     }
        //  }
          return responses;
        }
      },
      (error: any) => {
        // this.SetConfig();
        // 异常处理
        if (error.response) {
          switch (error.response.status) {
              case 401:
                let tak:any = ''
                let url: NewType = '';
                let baseURL: NewType = 'http://api.365tskj.com';
                let myhttp = window.location.href.replace('#','%23');
                let toUrl = `${this.baseURL}/wechat-platform/oauth2/wxOauth2/?appId=wx1c73e29ac42878a0&redirectUrl=` + this.myhttp; // 线上
                window.location.href = toUrl;
                const reg = new RegExp("(^|&)" +'Authorization'+ "=([^&]*)(&|$)");
                const r:any = window.location.search.substr(1).match(reg);
                tak = unescape(r[2]);
                sessionStorage.setItem('Authorization', tak);
                // 返回 401 清除token信息并跳转到登录页面
          }
      }
       
        return Promise.reject(error);
      },
    );
  }
}
export default ApiServe;


// const orgId = localStorage.getItem('orgId');
//     const url = `/health-assessment/mob/doctor/task/index/data/${orgId}`;
//     const data = {};
//     this.request.get(url, data, (res: any) => {
//       this.nums = res.data.data;
//       console.log(res)
//    });