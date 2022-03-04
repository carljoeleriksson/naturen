import { render, screen, waitFor} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Cart from "../Cart"
import { mockLocalStorage } from '../../__mocks__/localStorage';

const { getItemMock, setItemMock } = mockLocalStorage();

const mockProduct = {
    id: 1,
    name: "MockITestFil",
    description: "En såpbubbla som varar för evigt (så länge den förvaras i -50 och inte vidrörs",
    shortDesc: "Frusen såpbubbla",
    price: 199,
    image: "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1961&q=80",
    stock: 10,
    qty: 0
}
const mockProdArr = [
{
"id": 1,
"name": "MockIsbubbla",
"description": "En såpbubbla som varar för evigt (så länge den förvaras i -50 och inte vidrörs",
"shortDesc": "Frusen såpbubbla",
"price": 199,
"image": "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1961&q=80",
"stock": 10,
"qty": 0
},
{
"id": 2,
"name": "MockMossa",
"description": "En näve grön björnmossa från en klipphäll i Dalsland.",
"shortDesc": "En näve mossa",
"price": 349,
"image": "https://images.unsplash.com/photo-1591931559191-3ba5ecc12410?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80",
"stock": 10,
"qty": 0
},
{
"id": 3,
"name": "Sten",
"description": "Rejäl sten som varit med ett tag, men fortfarande i gott skick.",
"shortDesc": "Massiv diabas",
"price": 499,
"image": "https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
"stock": 10,
"qty": 0
},
{
"id": 4,
"name": "Sand",
"description": "500g gotländsk rauk-sand. Levereras i läcker glasburk",
"shortDesc": "sirlig rauk-sand",
"price": 295,
"image": "https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
"stock": 10,
"qty": 0
},
{
"id": 5,
"name": "Grankottar",
"description": "Ett knippe prima, kod-fria grankottar vid god vigör.",
"shortDesc": "kodfria och kastanjebruna",
"price": 199,
"image": "https://images.unsplash.com/photo-1510189511704-57f96164f531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
"stock": 10,
"qty": 0
},
{
"id": 6,
"name": "Torkad Maskros",
"description": "En långtorkad skir och blåsbar maskros ",
"shortDesc": "skir och blåsbar",
"price": 49,
"image": "https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
"stock": 10,
"qty": 0
},
{
"id": 7,
"name": "Skogssvamp",
"description": "Ett fång smakstarka skogssvampar växande på en mossig gren.",
"shortDesc": "smakstarka och spänstiga",
"price": 299,
"image": "https://images.unsplash.com/photo-1519305124423-5ccccff55da9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80",
"stock": 10,
"qty": 0
},
{
"id": 8,
"name": "Droppe",
"description": "Annars så svårfångad spetstoppig vattendroppe.",
"shortDesc": "spetstoppig och svårfångad",
"price": 349,
"image": "https://images.unsplash.com/photo-1563372949-0483fa40e5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2534&q=80",
"stock": 10,
"qty": 0
},
{
"id": 9,
"name": "Väg",
"description": "Kort avsnitt väg från Amerikas inland med patina",
"shortDesc": "asfalt med patina",
"price": 599,
"image": "https://images.unsplash.com/photo-1508985099650-ccd79f645fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
"stock": 10,
"qty": 0
}
]

describe('Cart component (dropdown-cart) tests', () => {
    beforeEach(() => {
        getItemMock.mockReturnValue(JSON.stringify(mockProdArr))
        render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        )
    })

    it('renders without crashing', () => {})

    it('renders a link tag', () => {   
        waitFor(() => {
            const linkElem = screen.getByTestId('gotocart')
            expect(linkElem).toBeInTheDocument()
        })        
    })

    it('renders li elements (of cart items)', () => {
        waitFor(() => {
            const cardElem = screen.queryAllByRole('listitem')
            expect(cardElem[0]).toBeInTheDocument()

        })
    })

})