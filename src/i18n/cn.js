import chineseMessages from '../ra-language-chinese';

export default {
    ...chineseMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            keypair_info: '密钥对管理',
            account_info: '账户管理',
            transaction_info:'交易',
            pending_reviews: 'Pending Reviews',
            new_customers: 'New Customers',
            pending_orders: 'Pending Orders',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to react-admin demo',
                subtitle:
                    "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                aor_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
    },
    resources: {
        Block: {
            name: '区块',
            tabs: {
                tab1: '基本项',
                tab2: '相关交易'
            },
             fields: {
                id: '序号',
                pid: '组网标识',
                height:'高度',
                preHash:'前块hash',
                transCount:'块内交易数',
                created: '生成时间'
            }
        },
        nodes: {
            notification: {
                approved_success: '服务已启动',
                approved_error: '错误: 服务启动失败',
                rejected_success: '服务已停止',
                rejected_error: '错误: 服务停止失败、',
            },
            name: '节点',
            tabs: {
                tab1: '基本项',
                tab2: '创世块',
                tab3: '配置',
                tab4: '信任证书列表'
            },
             fields: {
                id: '序号',
                sid: '标识',
                addr:'地址',
                pid:'组网',
                cid:'证书',
                created: '生成时间'
            }
        },
        networks: {
            name: '组网',
            tabs: {
                tab1: '基本项',
                tab2: '创世块',
                tab3: '配置',
                tab4: '信任证书列表',
                tab5: '区块列表'
            },
             fields: {
                id: '序号',
                netId: '组网标识',
                config:'配置',
                genesisBlock: '创世区块',
                seed:'种子节点',
                created: '生成时间'
            }
        },
        Transaction: {
            name: '交易',
            tabs: {
                tab1: '基本项',
                tab2: '合约'
            },
             fields: {
                id: '序号',
                txId: '交易标识',
                blockId:'区块标识',
                cid: '合约标识',
                cname: '合约名称',
                action: '交易行为',
                ipt:'输入参数',
                created: '生成时间'
            }
        },
        accounts: {
            name: '账号',
            tabs: {
                tab1: '基本项',
                tab2: '相关密钥',
                tab3: '相关交易'
            },
             fields: {
                id: '序号',
                sn: '标识',
                name: '姓名',
                phone: '手机号',
                created: '生成时间',
                modified: '修改时间',
                org:'单位/机构',
                status: '状态'
            }
        },
        certs: {
            tabs: {
                tab1: '基本项',
                tab2: '证书',
                tab3: '密钥对',
                tab4: '密码保护'
            },
            name: '证书',
            fields: {
                id: '序号',
                sn: '密钥标识',
                algorithm: '生成算法',
                desc: '备注',
                prv_key: '私钥',
                pub_key: '公钥',
                pub_cert: '证书',
                sn_cert: '证书标识',
                created: '生成时间',
                fimp: '导出文件',
                pwd_old: '旧密码',
                pwd1: '请输入密码',
                pwd2: '再一次输入密码',
                status: '状态'
            }
        },
        keypairs: {
            tabs: {
                tab1: '基本项',
                tab2: '证书',
                tab3: '密钥对',
                tab4: '密码保护'
            },
            name: '密钥对',
            fields: {
                id: '序号',
                sn: '密钥标识',
                algorithm: '生成算法',
                desc: '备注',
                prv_key: '私钥',
                pub_key: '公钥',
                pub_cert: '证书',
                sn_cert: '证书标识',
                created: '生成时间',
                fimp: '导出文件',
                pwd_old: '旧密码',
                pwd1: '请输入密码',
                pwd2: '再一次输入密码',
                status: '状态'
            }
        },
        users: {
            name: '用户 |||| 用户列表',
            fields: {
                name: '姓名',
                id: '序号',
                sn: '标识'
            }
        },
        customers: {
            name: 'Customer |||| Customers',
            fields: {
                commands: 'Orders',
                groups: 'Segments',
                last_seen_gte: 'Visited Since',
                name: 'Name',
                total_spent: 'Total spent',
            },
            tabs: {
                identity: 'Identity',
                address: 'Address',
                orders: 'Orders',
                reviews: 'Reviews',
                stats: 'Stats',
            },
            page: {
                delete: 'Delete Customer',
            },
        },
        commands: {
            name: 'Order |||| Orders',
            fields: {
                basket: {
                    delivery: 'Delivery',
                    reference: 'Reference',
                    quantity: 'Quantity',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    total: 'Total',
                    unit_price: 'Unit Price',
                },
                customer_id: 'Customer',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                status: 'Status',
                returned: 'Returned',
            },
        },
        products: {
            name: 'Poster |||| Posters',
            fields: {
                category_id: 'Category',
                height_gte: 'Min height',
                height_lte: 'Max height',
                height: 'Height',
                image: 'Image',
                price: 'Price',
                reference: 'Reference',
                stock_lte: 'Low Stock',
                stock: 'Stock',
                thumbnail: 'Thumbnail',
                width_gte: 'Min width',
                width_lte: 'Max width',
                width: 'Width',
            },
            tabs: {
                image: 'Image',
                details: 'Details',
                description: 'Description',
                reviews: 'Reviews',
            },
        },
        categories: {
            name: 'Category |||| Categories',
            fields: {
                products: 'Products',
            },
        },
        reviews: {
            name: 'Review |||| Reviews',
            fields: {
                customer_id: 'Customer',
                command_id: 'Order',
                product_id: 'Product',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        segments: {
            name: 'Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
    },
};