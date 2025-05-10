"use client"

import { useState, useEffect } from "react"
import { Eye, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getSupabaseBrowser } from "@/lib/supabase"

// Define types
type Order = {
  id: string
  customer_name: string
  created_at: string
  items: any[]
  total_amount: number
  status: string
  delivery_date: string
  delivery_method: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const supabase = getSupabaseBrowser()

      // In a real app, we would fetch real orders from the database
      // For now, we'll use mock data

      // Mock data for orders
      const mockOrders = [
        {
          id: "ORD123456",
          customer_name: "John Smith",
          created_at: "2023-05-08",
          items: [{ name: "Custom Cake", size: '8" Round', flavor: "Chocolate" }],
          total_amount: 65.0,
          status: "pending",
          delivery_date: "2023-05-10",
          delivery_method: "pickup",
        },
        {
          id: "ORD123457",
          customer_name: "Sarah Johnson",
          created_at: "2023-05-07",
          items: [{ name: "Custom Cupcakes", size: "12 Cupcakes", flavor: "Red Velvet" }],
          total_amount: 42.0,
          status: "confirmed",
          delivery_date: "2023-05-12",
          delivery_method: "delivery",
        },
        {
          id: "ORD123458",
          customer_name: "Michael Brown",
          created_at: "2023-05-06",
          items: [{ name: "Custom Cake", size: '10" Round', flavor: "Vanilla" }],
          total_amount: 75.0,
          status: "completed",
          delivery_date: "2023-05-09",
          delivery_method: "pickup",
        },
        {
          id: "ORD123459",
          customer_name: "Emily Davis",
          created_at: "2023-05-05",
          items: [
            { name: "Custom Cake", size: '6" Round', flavor: "Lemon" },
            { name: "Custom Cupcakes", size: "6 Cupcakes", flavor: "Vanilla" },
          ],
          total_amount: 53.0,
          status: "confirmed",
          delivery_date: "2023-05-11",
          delivery_method: "delivery",
        },
        {
          id: "ORD123460",
          customer_name: "David Wilson",
          created_at: "2023-05-04",
          items: [{ name: "Custom Cupcakes", size: "24 Cupcakes", flavor: "Funfetti" }],
          total_amount: 60.0,
          status: "pending",
          delivery_date: "2023-05-10",
          delivery_method: "pickup",
        },
      ]

      setOrders(mockOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [])

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  if (loading) {
    return <div>Loading orders...</div>
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by order ID or customer name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items.length} item(s)</TableCell>
                    <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "outline"
                            : order.status === "confirmed"
                              ? "secondary"
                              : "default"
                        }
                        className={
                          order.status === "pending"
                            ? "border-orange-500 text-orange-500"
                            : order.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(order.delivery_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No orders found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Placed on {selectedOrder && new Date(selectedOrder.created_at).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Customer Information</h3>
                  <p>{selectedOrder.customer_name}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Order Items</h3>
                  <ul className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <li key={index} className="border-b pb-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.size} - {item.flavor}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="font-semibold mb-1">Delivery Method</h3>
                    <p className="capitalize">{selectedOrder.delivery_method}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Delivery Date</h3>
                    <p>{new Date(selectedOrder.delivery_date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="font-semibold mb-1">Status</h3>
                    <Badge
                      variant={
                        selectedOrder.status === "pending"
                          ? "outline"
                          : selectedOrder.status === "confirmed"
                            ? "secondary"
                            : "default"
                      }
                      className={
                        selectedOrder.status === "pending"
                          ? "border-orange-500 text-orange-500"
                          : selectedOrder.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Total</h3>
                    <p className="font-bold">${selectedOrder.total_amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Update Status</Button>
                  <Button className="bg-[#D4A373] hover:bg-[#C89364]">Print Order</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
