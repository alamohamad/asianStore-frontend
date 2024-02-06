import React from 'react'
import CategoriesCard from '../components/CategoriesCard'
export const categories=[{
    src:'https://i5.walmartimages.com/seo/YiLvUst-Women-s-Casual-Cropped-Jackets-Button-Down-Long-Sleeve-Shirts-Jacket-With-Pockets_dda94bc0-6653-498e-9112-765ea1489f93.13909a98a25ebacca795a900ec2d815a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    name:'Women'
},
{
    src:'https://images-na.ssl-images-amazon.com/images/I/718Nh9IeT5L._AC_UL600_SR600,600_.jpg',
    name:'Men'
},{
    src:'https://bagallery.com/cdn/shop/products/1_60f14d5b-e674-4e8b-afc4-5e436b4c933e.jpg?v=1611117834',
    name:'Jewelry'
},{
    src:'https://cdn.shopify.com/s/files/1/0003/1902/9309/products/sunday-dress-4_2000x.jpg',
    name:'Kids'
},{
    src:'https://i5.walmartimages.com/asr/8a8156ec-2e65-4e1b-ba06-bae128587920.1c51b9830c52ea66dbe6e513a789e395.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    name:'Shoes'
},{
    src:'https://www.voganow.com/cdn/shop/products/VNLB-1033-043P-GL-LRG_1.jpg?v=1677501856',
    name:'Bags'
},
{
    src:'https://rentstacks.com/cdn/shop/products/Square-POS-Rentals_480x480.png?v=1613273640',
    name:'Electronics'

},
{
    src:'https://m.media-amazon.com/images/I/61gZqHYV1PL.jpg',
    name:'Beauty'

},{
    src:'https://i5.walmartimages.com/asr/ff5d3911-e164-422c-8240-84f42f55ef9a.db6290a5de18b25da246afbcb2a6a99f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    name:'Home'

},{
    src:'https://itgirlclothing.com/cdn/shop/products/itgirl-shop-beige-hooded-windbreaker-elastic-waist-jacket-3920428761123.jpg?v=1573977027',
    name:'Outerwear'

},{
    src:'https://img.ltwebstatic.com/images3_spmp/2023/09/11/bd/1694419382bbdf300bfc29297bf5bb3ced5e363b42_thumbnail_720x.jpg',
    name:'Health'

},

{
    src:'https://i5.walmartimages.com/asr/abb5c5a3-6cc0-4e5b-a974-6ec0fc2a4d6c.e49d465537fe35ea51745271e9bf2d6f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',
    name:'Clocks'

},

]





export default function CategoriesList() {
  return (
    <div>
        <div className='container-fluid containers ml-5 mr-5 mt-5'>
        <div className='row' >
        {
            categories.map((item)=>
                (
                  <div className='col-6 col-sm-4 col-md-3 col-lg-2'>
                    <CategoriesCard {...item}/>
                  </div>
                )


             
                )
        }
        </div>
            
        </div>

     
      
    </div>
  )
}
