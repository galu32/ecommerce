<template>
    <div>
        <div class='text-h2 text-primary'
             style='margin:15px;'
        > Items from Category: {{CatName}} </div>
        <q-scroll-area
            style="height: 700px; width: 100%; padding:10px;"
            class="bg-grey-1 rounded-borders"
        >
            <q-separator/>
            <div class=''>
                <div v-for='item in Items'
                     :key=item.Code
                     style='width:22%;  display: inline-block;
                margin-left:36px;margin-top:40px;'
                >
                    <ProductCard 
                        v-bind=item
                    />
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>

<script>
export default {
    components: {},
    name: 'ItemsGrid',
    props: {
    },
    data() {
        return {
            Items: [],
            CatName: '',
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        loadItems: function () {
            let params = this.$route.params;
            let items = this.$store.state.items;
            if (params.subcategory) this.Items = items.filter(r => r.SubCategories && r.SubCategories.split(',').includes(params.subcategory));
            else this.Items = items.filter(r => r.Categories && r.Categories.split(',').includes(params.category));
            if (params.subcategory) this.CatName = this.$store.state.subcategories.find(r => r.Code === params.subcategory).Name;
            else this.CatName = this.$store.state.categories.find(r => r.Code === params.category).Name;
        }
    },
    watch: {
        '$route.params.category': function (nv) {
            this.loadItems();
        },
        '$route.params.subcategory': function (nv) {
            this.loadItems();
        }
    }
};
</script>
