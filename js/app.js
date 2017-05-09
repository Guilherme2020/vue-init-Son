/**
 * Created by grodrigues on 28/04/17.
 */


    const hello = new Vue({

        el: '#hello',
        data:{
          books:[],
          MySearch:'',
          orderCol:'id',
          orderInverse:1,
          pagination:{
              maxPage:4,
              current:1,
              totalItems:0,
              totalPages:0,
              listNumbers:[],
              listPagination:[]
          }

            // Testes
            // msg:"Hello Vue!",
           // peoples:[
           //     {name:"Maria"},
           //     {name:"Dhara"},
           //     {name:"Guilherme"}
           // ],
           // newElement:'',
           // elements: [],
           //  myListForm:[],
           //  myForm:{
           //      name:'',
           //      email:''
           //  }

        },
        methods:{
            filterOrderBy:function (e,col) {
                e.preventDefault();
                this.orderCol = col;
                this.orderInverse = this.orderInverse * -1;
            },

            previous:function(e){
                e.preventDefault();


                console.log('maxPage: ' + this.pagination.maxPage);
                console.log('current: ' + this.pagination.current);
                console.log('totalItems: ' + this.pagination.totalItems);
                console.log('totalPages: ' + this.pagination.totalPages);
                console.log('listNumbers: ' + this.pagination.listNumbers);
                console.log('listPagination: ' + this.pagination.listPagination);

                if(this.pagination.current === 1){
                    return false;
                }
                this.pagination.current = this.pagination.current - 1;


                this.books = this.pagination.listPagination[this.pagination.current - 1];

            },
            pagePagination:function(e,current){
                e.preventDefault();
                console.log('maxPage: ' + this.pagination.maxPage);
                console.log('current: ' + this.pagination.current);
                console.log('totalItems: ' + this.pagination.totalItems);
                console.log('totalPages: ' + this.pagination.totalPages);
                console.log('listNumbers: ' + this.pagination.listNumbers);
                console.log('listPagination: ' + this.pagination.listPagination);
                this.pagination.current = current + 1;
                this.books = this.pagination.listPagination[current];

            },
            next:function(e){
                e.preventDefault();
                console.log('maxPage: ' + this.pagination.maxPage);
                console.log('current: ' + this.pagination.current);
                console.log('totalItems: ' + this.pagination.totalItems);
                console.log('totalPages: ' + this.pagination.totalPages);
                console.log('listNumbers: ' + this.pagination.listNumbers);
                console.log('listPagination: ' + this.pagination.listPagination);

                if(this.pagination.current === this.pagination.totalPages){
                    return false;
                }
                this.pagination.current = this.pagination.current + 1;

                this.books = this.pagination.listPagination[this.pagination.current - 1];

            }

        },

    // computed:{
        //     booksCom(){
        //
        //         let reg = new RegExp(`^.*${this.MySearch}.*$`, 'i');
        //
        //         return this.books.filter(book => reg.test(book.title) || reg.test(book.description) );
        //     }
        // },

    ready:function(){
        const self = this;
        self.$http.get('dataServer.json').then(function(response){
            //console.log(response);
            self.pagination.totalItems = response.data.length;
            self.pagination.totalPages = Math.ceil(response.data.length/self.pagination.maxPage);
            var aux = [];
            for(const k in response.data){
                aux.push(response.data[k]);
                if(aux.length === self.pagination.maxPage){
                    self.pagination.listPagination.push(aux);
                    aux = [];
                }
            }
            if(aux.length > 0){
                self.pagination.listPagination.push(aux);
            }
            //console.log(self.pagination.listPagination);
            self.books = self.pagination.listPagination[0];
        });
    }
       // ready:function(){
       //      var self = this;
       //      self.$http.get('dataServer.json').then(function (response) {
       //          // console.log(response);
       //          self.books = response.data;
       //      });
       // }
       // methods:{
        //     addElement:function (){
        //         const title = this.newElement.trim();
        //         if(title){
        //             this.elements.push({title:title});
        //             this.newElement = "";
        //         }
        //
        //     },
        //     removeElement: function(e,index){
        //         e.preventDefault();
        //         this.elements.splice(index,1);
        //
        //     },
        //     myClick: function(){
        //         alert("Ola");
        //     },
        //     myKeyUp:function () {
        //         alert('MyKeyup');
        //     },
        //     addForm:function(){
        //         this.myListForm.push({name:this.myForm.name ,email:this.myForm.email});
        //         this.myForm.name = '';
        //         this.myForm.email = '';
        //     }
        //
        // }


    });

