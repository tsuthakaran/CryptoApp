import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"



const style = `text-[#F0E7A1] hover:bg-[#F0E7A1]/20 hover:text-white hover:-translate-y-2 transition duration-300`
const TransactionButton = () => {
    return (
        <Card className="flex flex-row border border-black bg-black">
            <Button className={`${style}`}>
                <Link to="/Transaction">Transactions</Link>
            </Button>
        </Card>
    )
}
export default TransactionButton