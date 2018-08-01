import fakeDataProvider from './ra-data-fakerest';

const str_base64 = `
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Mailvelope v2.2.2
Comment: https://www.mailvelope.com

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
08aZuzzh8vje
=Sq8u
-----END PGP PRIVATE KEY BLOCK-----
`
export default  fakeDataProvider({
    posts: [
        { id: 2, title: 'Hello, world!' ,body:'body1111',userId:1},
        { id: 1, title: 'FooBar'  ,body:'body2222',userId:2 },
    ],
    comments: [
        { id: 2, post_id: 1, author: 'John Doe', body: 'Sensational!' },
        { id: 1, post_id: 1, author: 'Jane Doe', body: 'I agree' },
    ],
    users: [
        { id: 2, name: '楚留香', username: 'clx', email: 'Sensational@lk.cn' },
        { id: 1, name: '陆小凤', username: 'lxf', email: 'Iagree@lk.cn' },
    ],
    keypairs: [{ 
        id: 2, 
        desc: '服装供应链主密钥对', 
        sn: '9316EC91876CDEE5',
        algorithm:'secp256k1',
        len: 256,
        pwd_old:'',
        pwd_1:'',
        pwd_2:'',
        aid:1,
        prv_key: str_base64, 
        pub_key: str_base64, 
        pub_cert: str_base64 ,
        sn_cert: '76CDEE59316EC918',
        created: new Date(),
        modified: new Date(),
        expired:  new Date(),
        fimp:'fimp222',
        status:true
      },{ 
        id: 1, 
        aid:2,
        desc: '服装供应链副密钥对',
        sn: '933B7314F154EAB0',
        algorithm:'secp256k1',
        len: 256,
        pwd_old:'',
        pwd_1:'',
        pwd_2:'',
        prv_key: str_base64, 
        pub_key: str_base64, 
        pub_cert: str_base64 ,
        sn_cert: '4F154EAB0933B731',
        created: new Date(),
        modified: new Date(),
        expired:  new Date(),
        fimp:'fimp111',
        status:false
      },
    ],
    certs: [{ 
        id: 2, 
        desc: '服装供应链主密钥对', 
        sn: '9316EC91876CDEE5',
        algorithm:'secp256k1',
        len: 256,
        pwd_old:'',
        pwd_1:'',
        pwd_2:'',
        aid:1,
        prv_key: str_base64, 
        pub_key: str_base64, 
        pub_cert: str_base64 ,
        sn_cert: '76CDEE59316EC918',
        created: new Date(),
        modified: new Date(),
        expired:  new Date(),
        fimp:'fimp222',
        status:true
      },{ 
        id: 1, 
        aid:2,
        desc: '服装供应链副密钥对',
        sn: '933B7314F154EAB0',
        algorithm:'secp256k1',
        len: 256,
        pwd_old:'',
        pwd_1:'',
        pwd_2:'',
        prv_key: str_base64, 
        pub_key: str_base64, 
        pub_cert: str_base64 ,
        sn_cert: '4F154EAB0933B731',
        created: new Date(),
        modified: new Date(),
        expired:  new Date(),
        fimp:'fimp111',
        status:false
      },
    ],
    accounts: [{ 
            id: 1, 
            sn: '933B7314F154EAB0',
            name: '郭啸天', 
            phone:'13668895941',
            tel:'010-62628881',
            email: 'Sensational@lk.cn',
            address: '浙江省杭州市临安区牛家庄镇',
            org:'牛家庄村民',
            avatar: 'avatar1111',
            status: true,
            created: new Date(),
            modified: new Date()
        },{ 
            id: 2, 
            sn: '9316EC91876CDEE5',
            name: '完颜洪烈', 
            org:'大金国驻大宋全权大使',
            phone:'13668895941',
            tel:'010-62628881',
            email: 'Sensation222@lk.cn',
            address: '北京西城丰台区',
            avatar: 'avatar2222',
            status: false,
            created: new Date(),
            modified: new Date()
        }
    ],

    
    transactions:[{
        id:1,
        aid:1,
        bid:1,
        txId:'8f7a1220-837e-11e8-9048-d88ea590858c',
        cid:'0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7',
        blockId:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        cname:'资产管理',
        action:'transfer',
        ipt:`{
            "from" : "1MH9xedPTkWThJUgT8ZYehiGCM7bEZTVGN",
            "to" : "12kAzqqhuq7xYgm9YTph1b9zmCpZPyUWxf",
            "amount" : 5
          }        
          `,
        created: new Date()
    },{
        id:2,
        aid:1,
        bid:1,
        txId:'8f927c20-837e-11e8-9048-d88ea590858c',
        cid:'0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7',
        blockId:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        cname:'资产管理',
        action:'transfer',
        ipt:`{
            "from" : "1MH9xedPTkWThJUgT8ZYehiGCM7bEZTVGN",
            "to" : "12kAzqqhuq7xYgm9YTph1b9zmCpZPyUWxf",
            "amount" : 5
          }        
          `,
        created: new Date()
    }
    ],
    //组网
    networks:[{
        id:1,
        netId:'cluster-2333',
        seed:'192.168.1.5:8081',
        genesisBlock:`
        {
            "version" : 1,
            "timestamp" : "2017-05-22T11:07:32.086Z",
            "transactions" : [ {
              "type" : "CHAINCODE_DEPLOY",
              "chaincodeID" : "cGF0aDogIiIKbmFtZTogIjBiZmJlMmZhZjg1OGRkNDk1ZTcxMmZiMGY4OTdkZDY2MDgyZjA2Yjg3OWZhMjFhODBmY2MyYWNiYzE5OWI4ZDciCg==",
              "payload" : {
                "chaincodeID" : {
                  "name" : "0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7"
                },
                "ctorMsg" : { },
                "timeout" : 1000,
                "secureContext" : "secureContext",
                "codePackage" : "DQovKg0KICogQ29weXJpZ2h0ICAyMDE4IEJsb2NrY2hhaW4gVGVjaG5vbG9neSBhbmQgQXBwbGljYXRpb24gSm9pbnQgTGFiLCBGaW50ZWNoIFJlc2VhcmNoIENlbnRlciBvZiBJU0NBUy4NCiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSAiTGljZW5zZSIpOw0KICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLg0KICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0DQogKg0KICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjANCiAqDQogKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlDQogKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiAiQVMgSVMiIEJBIFNJUywNCiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLg0KICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZA0KICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuDQogKi8NCg0KaW1wb3J0IG9yZy5qc29uNHMuXw0KaW1wb3J0IG9yZy5qc29uNHMuamFja3Nvbi5Kc29uTWV0aG9kcy5fDQppbXBvcnQgcmVwLnNjLmNvbnRyYWN0Ll8NCmltcG9ydCByZXAuc3RvcmFnZS5GYWtlU3RvcmFnZS5LZXkNCg0KLyoqDQogKiDotYTkuqfnrqHnkIblkIjnuqYNCiAqLw0KDQpjbGFzcyBOZXdDb250cmFjdCBleHRlbmRzIElDb250cmFjdHsNCiAgY2FzZSBjbGFzcyBUcmFuc2Zlcihmcm9tOlN0cmluZywgdG86U3RyaW5nLCBhbW91bnQ6SW50KQ0KLy8gIGNhc2UgY2xhc3MgUHJvb2Yoa2V5OlN0cmluZywgY29udGVudDpTdHJpbmcpDQogIGNhc2UgY2xhc3MgUmVwbGFjZUNlcnQoY2VydDpTdHJpbmcsIGFkZHI6U3RyaW5nKQ0KLy8gIGNhc2UgY2xhc3MgQ2VydChjZXJ0OlN0cmluZywgaW5mbzpTdHJpbmcpDQoNCiAgaW1wbGljaXQgdmFsIGZvcm1hdHMgPSBEZWZhdWx0Rm9ybWF0cw0KICANCiAgICBkZWYgaW5pdChjdHg6IENvbnRyYWN0Q29udGV4dCl7ICAgICAgDQogICAgICBwcmludGxuKHMidGlkOiAkY3R4LnQudHhpZCIpDQogICAgfQ0KICAgIA0KICAgIGRlZiBzZXQoY3R4OiBDb250cmFjdENvbnRleHQsIGRhdGE6TWFwW1N0cmluZyxJbnRdKTpPYmplY3Q9ew0KICAgICAgcHJpbnRsbihzInNldCBkYXRhOiRkYXRhIikNCiAgICAgIGZvcigoayx2KTwtZGF0YSl7DQogICAgICAgIGN0eC5hcGkuc2V0VmFsKGssIHYpDQogICAgICB9DQogICAgICBudWxsDQogICAgfQ0KICAgIA0KICAgICAgICANCiAgICBkZWYgcmVhZChjdHg6IENvbnRyYWN0Q29udGV4dCwga2V5OiBTdHJpbmcpOkFueT17DQogICAgICBjdHguYXBpLmdldFZhbChrZXkpDQogICAgfQ0KICAgIA0KICAgIGRlZiBsb2FkQ2VydChjdHg6IENvbnRyYWN0Q29udGV4dCwgY2VydDogU3RyaW5nKTogVW5pdCA9IHsNCiAgICAgIAljdHguYXBpLmxvYWRDZXJ0KGNlcnQpOw0KCSAgICAgIHByaW50KCJjZXJ0OiIrY2VydCk7DQogICAgfQ0KICAgIA0KICAgIGRlZiB3cml0ZShjdHg6IENvbnRyYWN0Q29udGV4dCwgZGF0YTpNYXBbU3RyaW5nLEludF0pOk9iamVjdCA9IHsNCiAgICAgICBmb3IoKGssdik8LWRhdGEpew0KICAgICAgICBjdHguYXBpLnNldFZhbChrLCB2KQ0KICAgICAgfQ0KICAgICAgbnVsbA0KICAgIH0NCiAgICANCiAgICBkZWYgcHV0X3Byb29mKGN0eDogQ29udHJhY3RDb250ZXh0LCBkYXRhOk1hcFtTdHJpbmcsQW55XSk6T2JqZWN0PXsNCiAgICAgIC8v5YWI5qOA5p+l6K+laGFzaOaYr+WQpuW3sue7j+WtmOWcqCzlpoLmnpzlt7LlrZjlnKgs5oqb5byC5bi4DQogICAgICBmb3IoKGssdik8LWRhdGEpew0KCSAgICAgIHZhciBwdjAgPSBjdHguYXBpLmdldFZhbChrKQ0KCSAgICAgIGlmKHB2MCAhPSBudWxsKQ0KCQkgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCJbIitrKyJd5bey5a2Y5Zyo77yM5b2T5YmN5YC8WyIrcHYwKyJdIik7DQoJICAgICAgY3R4LmFwaS5zZXRWYWwoayx2KTsNCgkgICAgICBwcmludCgicHV0UHJvb2Y6IitrKyI6Iit2KTsNCiAgICAgIH0NCgkgICAgInB1dF9wcm9vZiBvayINCiAgICB9DQogICAgDQogICAgDQogICAgDQogICAgZGVmIHNpZ251cChjdHg6IENvbnRyYWN0Q29udGV4dCwgZGF0YTpNYXBbU3RyaW5nLFN0cmluZ10pOk9iamVjdCA9IHsNCiAgICAgIHZhciBhZGRyID0gIiINCiAgICAJZm9yKChrLHYpPC1kYXRhKXsNCiAgICAgICAgY3R4LmFwaS5jaGVjayhjdHgudC5jZXJ0LnRvU3RyaW5nVXRmOCxjdHgudCkNCiAgICAJICBhZGRyID0gY3R4LmFwaS5zaWdudXAoayx2KQ0KICAgICAgfQ0KICAgIAlhZGRyDQogICAgfQ0KICAgIA0KICAgIGRlZiBkZXN0cm95Q2VydChjdHg6IENvbnRyYWN0Q29udGV4dCwgY2VydEFkZHI6IFN0cmluZyk6IE9iamVjdCA9IHsNCiAgICAgIHByaW50bG4ocyJkZXN0cm95IGNlcnQtPmFkZHI6JGNlcnRBZGRyIikNCiAgICAgIGN0eC5hcGkuY2hlY2soY3R4LnQuY2VydC50b1N0cmluZ1V0ZjgsY3R4LnQpICAgIC8vY3R45Lit6Ieq5bim5Lqk5piT5YaF5a65DQoJICAgIGN0eC5hcGkuZGVzdHJveUNlcnQoY2VydEFkZHIpOw0KICAgICAgImRlc3Rvcnkgc2N1Y2Nlc3MiDQogICAgfQ0KICAgIA0KICAgIGRlZiByZXBsYWNlQ2VydChjdHg6IENvbnRyYWN0Q29udGV4dCwgZGF0YTpSZXBsYWNlQ2VydCk6IE9iamVjdCA9IHsNCiAgICAgIHZhbCBjZXJ0ID0gZGF0YS5jZXJ0DQogICAgICB2YWwgYWRkciA9IGRhdGEuYWRkcg0KICAgICAgY3R4LmFwaS5jaGVjayhjdHgudC5jZXJ0LnRvU3RyaW5nVXRmOCxjdHgudCkNCgkgICAgY3R4LmFwaS5yZXBsYWNlQ2VydChjZXJ0LGFkZHIpOyAgIC8vIOi/lOWbnuefreWcsOWdgA0KICAgIH0NCiAgICANCiAgICBkZWYgdHJhbnNmZXIoY3R4OiBDb250cmFjdENvbnRleHQsIGRhdGE6VHJhbnNmZXIpOk9iamVjdD17DQogICAgICB2YWwgc2Zyb20gPSAgY3R4LmFwaS5nZXRWYWwoZGF0YS5mcm9tKQ0KICAgICAgdmFyIGRmcm9tID1zZnJvbS50b1N0cmluZy50b0ludA0KICAgICAgaWYoZGZyb20gPCBkYXRhLmFtb3VudCkNCiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbigi5L2Z6aKd5LiN6LazIikNCiAgICAgIHZhciBkdG8gPSBjdHguYXBpLmdldFZhbChkYXRhLnRvKS50b1N0cmluZy50b0ludA0KICAgICAgLy9pZihkdG89PW51bGwpIGR0byA9IDA7DQogICAgICANCiAgICAgIGN0eC5hcGkuc2V0VmFsKGRhdGEuZnJvbSxkZnJvbSAtIGRhdGEuYW1vdW50KQ0KICAgICAgY3R4LmFwaS5zZXRWYWwoZGF0YS50byxkdG8gKyBkYXRhLmFtb3VudCkNCiAgICAgICJ0cmFuc2ZlciBvayINCiAgICB9DQogICAgDQogICAgLyoqDQogICAgICog5qC55o2uYWN0aW9uLOaJvuWIsOWvueW6lOeahG1ldGhvZO+8jOW5tuWwhuS8oOWFpeeahGpzb27lrZfnrKbkuLJwYXJzZeS4um1ldGhvZOmcgOimgeeahOS8oOWFpeWPguaVsA0KICAgICAqLw0KICAgIGRlZiBvbkFjdGlvbihjdHg6IENvbnRyYWN0Q29udGV4dCxhY3Rpb246U3RyaW5nLCBzZGF0YTpTdHJpbmcgKTpPYmplY3Q9ew0KICAgICAgLy9wcmludGxuKHMib25BY3Rpb24tLS0iKQ0KICAgICAgLy9yZXR1cm4gInRyYW5zZmVyIG9rIg0KICAgICAgdmFsIGpzb24gPSBwYXJzZShzZGF0YSkNCiAgICAgIA0KICAgICAgYWN0aW9uIG1hdGNoIHsNCiAgICAgICAgY2FzZSAidHJhbnNmZXIiID0+IA0KICAgICAgICAgIHByaW50bG4ocyJ0cmFuc2ZlciBvb29rIikNCiAgICAgICAgICB0cmFuc2ZlcihjdHgsanNvbi5leHRyYWN0W1RyYW5zZmVyXSkNCiAgICAgICAgY2FzZSAic2V0IiA9PiANCiAgICAgICAgICBwcmludGxuKHMic2V0IikgDQogICAgICAgICAgc2V0KGN0eCwganNvbi5leHRyYWN0W01hcFtTdHJpbmcsSW50XV0pDQogICAgICAgIGNhc2UgInB1dF9wcm9vZiIgPT4gDQogICAgICAgICAgcHJpbnRsbihzInB1dF9wcm9vZiIpIA0KICAgICAgICAgIHB1dF9wcm9vZihjdHgsIGpzb24uZXh0cmFjdFtNYXBbU3RyaW5nLEFueV1dKQ0KICAgICAgICBjYXNlICJzaWdudXAiID0+IA0KICAgICAgICAgIHByaW50bG4ocyJzaWdudXAiKSANCiAgICAgICAgICBzaWdudXAoY3R4LCBqc29uLmV4dHJhY3RbTWFwW1N0cmluZyxTdHJpbmddXSkNCiAgICAgICAgY2FzZSAiZGVzdHJveUNlcnQiID0+IA0KICAgICAgICAgIHByaW50bG4ocyJkZXN0cm95Q2VydCIpDQogICAgICAgICAgZGVzdHJveUNlcnQoY3R4LCBqc29uLmV4dHJhY3RbU3RyaW5nXSkNCiAgICAgICAgY2FzZSAicmVwbGFjZUNlcnQiID0+IA0KICAgICAgICAgIHByaW50bG4ocyJyZXBsYWNlQ2VydCIpDQogICAgICAgICAgcmVwbGFjZUNlcnQoY3R4LCBqc29uLmV4dHJhY3RbUmVwbGFjZUNlcnRdKQ0KICAgICAgfQ0KICAgIH0NCiAgICANCn0NCg==",
                "ctype" : "CODE_SCALA"
              },
              "txid" : "0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7",
              "timestamp" : "2018-05-21T16:00:55.405Z",
              "confidentialityProtocolVersion" : "confidentialityProtocolVersion-1.0",
              "nonce" : "bm9uY2U=",
              "toValidators" : "dG9WYWxpZGF0b3Jz",
              "cert" : "MUpKcDVCekhjN0ZlblZwRTNnWHpGQjl6TTllRWtLZlAxSA==",
              "signature" : "MEYCIQDKE0pwdZBIXP3ob3DQruHhWm2+UfsQzsOSHiX/S30CawIhAJCyykB72c6xnJt1H9ba4nDJ1ggOQqysFak7FRDis98h"
            }, {
              "type" : "CHAINCODE_INVOKE",
              "chaincodeID" : "cGF0aDogIiIKbmFtZTogIjBiZmJlMmZhZjg1OGRkNDk1ZTcxMmZiMGY4OTdkZDY2MDgyZjA2Yjg3OWZhMjFhODBmY2MyYWNiYzE5OWI4ZDciCg==",
              "payload" : {
                "chaincodeID" : {
                  "name" : "0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7"
                },
                "ctorMsg" : {
                  "function" : "set",
                  "args" : [ "{\r\n  \"1AqZs6vhcLiiTvFxqS5CEqMw6xWuX9xqyi\" : 1000000,\r\n  \"1GvvHCFZPajq5yVY44n7bdmSfv2MJ5LyLs\" : 1000000,\r\n  \"16SrzMbzdLyGEUKY5FsdE8SVt5tQV1qmBY\" : 1000000,\r\n  \"12kAzqqhuq7xYgm9YTph1b9zmCpZPyUWxf\" : 1000000,\r\n  \"1MH9xedPTkWThJUgT8ZYehiGCM7bEZTVGN\" : 1000000\r\n}" ]
                },
                "timeout" : 1000,
                "secureContext" : "secureContext"
              },
              "txid" : "181c7790-5ccd-11e8-9e80-3491d5c5ab14",
              "timestamp" : "2018-05-21T16:00:56.929Z",
              "confidentialityProtocolVersion" : "confidentialityProtocolVersion-1.0",
              "nonce" : "bm9uY2U=",
              "toValidators" : "dG9WYWxpZGF0b3Jz",
              "cert" : "MUpKcDVCekhjN0ZlblZwRTNnWHpGQjl6TTllRWtLZlAxSA==",
              "signature" : "MEQCIHPbNl0/zj6Peql477kmaqQb3wicKxnnMntKz0tXyM4gAiA4f6BELbiZ6ShSot89YcKZCX2STV6ISqiOhDiOb+Qn7w=="
            } ],
            "consensusMetadata" : [ {
              "endorser" : "MUpKcDVCekhjN0ZlblZwRTNnWHpGQjl6TTllRWtLZlAxSA==",
              "signature" : "MEYCIQDUmxg30ZMLXjjHBR3vsYOQpFzp/hjfGQuLDcWwGqc4uQIhAM6vTRcFlDEqsVErOc/wqgE6+p+lud4+LDMxSLJP7zOl"
            }, {
              "endorser" : "MU1IOXhlZFBUa1dUaEpVZ1Q4WlllaGlHQ003YkVaVFZHTg==",
              "signature" : "MEYCIQDFtuWnCIu6smwqLOd6DrPaaCzGDA5GbdC5bse/zw8y8QIhANcZ4CEDOjYNtFD4mJ8ixF0YVpYdghNlNBKALsy8FTrd"
            } ]
          }
                  `,
        config:`
        system {
            //api是否开启
            //如果是单机多节点测试模式（Repchain，则选择0，默认节点1会开启）
            ws_enable = 0//api 0,不开启;1,开启
            //交易生产方式
            trans_create_type = 0 //0,手动;1,自动
            //是否进行TPS测试
            statistic_enable = 0 // 0,unable;able
            
            httpServicePort = 8081//http服务的端口号，默认为8081
            
            block {
              //块内交易的最大数量
              trans_num_limit = 50
              //块内交易标准最小数量
              trans_num_min =1
              //交易数量不足，重试次数
              retry_time = 10
            }
          
            vote {
              //最低投票人数量
              vote_note_min = 4
            }
          
           diskspaceManager{
               diskspacealarm = 5000//磁盘最少空间大小，单位M ，小于这个值系统将不能启动。
           }
          
            transaction {
              //辅助自动创建交易的间隔
              tran_create_dur = 5000 //millis
              //最大交易缓存量
              max_cache_num = 10000
            }
          
            cluster {
              //节点入网稳定时间
              node_stable_delay = 5000 //millis
            }
          
            time {
              //通用稳定延迟
              stable_time_dur = 5000 //millis，确保block模块能够接收到confirm的块数据
          
              block {
                //投票选举重试间隔
                vote_retry_delay = 100
                //投票重试无果后等待时间
                //waiting_delay = 3600000
                waiting_delay = 360
              }
          
              //超时策略：1,手动；0，自动
              timeout_policy_type = 0
          
              timeout {
                //Unit : Second 以下的超时时间一般采用默认配置
                //For auto 自动采用的超时时间
                base_preload = 30//交易预执行的超时时间，单位是s
                base_vote = 20//内部消息传递速度快，抽签的超时时间
                base_sync = 20//没有耗时操作，没有大块传输的情况下
                base_addition = 0//冗余量，不用配置
          
                //For config manually 手工设置超时时间，系统主动采用手工设置的时间，可以不用设置
                block = 60//出块的超时时间
                endorse = 2//背书超时时间，单位为秒
                transaction_preload = 30
                sync_chain = 30//链同步的超时时间
                transcation_waiting = 900//交易在交易池中等待入块到的超时时间，单位是秒
              }
            }
          
            consensus {
              //共识类型，目前只支持一种
              type = "CRFD"
            }
            
          }        `,
        certList:'',
        rtGraph:'192.168.1.5:8081/web/g1.html',
        created:new Date()
    }
    ],
    //组网节点
    nodes:[{
        id:1,
        sid:'peer-192.168.2.211',
        addr:'192.168.2.211:8081',
        //组网
        pid:1,
        //证书
        cid:1,
        status:1,
        rtGraph:'192.168.1.5:8081/web/g1.html',
        created: new Date()
    }
    ],
    blocks:[{
        id:1,
        pid:1,
        height:1,
        preHash:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        transCount:50,
        created: new Date()
    },{
        id:2,
        pid:1,
        height:2,
        preHash:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        transCount:50,
        created: new Date()
    },{
        id:3,
        pid:1,
        height:3,
        preHash:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        transCount:50,
        created: new Date()
    },{
        id:4,
        pid:1,
        height:4,
        preHash:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        transCount:50,
        created: new Date()
    },{
        id:5,
        pid:1,
        height:5,
        preHash:'MzFkMTJlYzgwMzVmZjMwYzQwN2EyNjk4ZDQ5YzI3OWYyYWVhOGQyMmNlM2NiYzFjODZjMGMzNzFmNmUzNmI4OA==',
        transCount:50,
        created: new Date()
    }
    ]
})
