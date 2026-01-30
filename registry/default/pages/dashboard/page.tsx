"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Activity,
  Users,
  HelpCircle,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Globe,
  Mail,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogoutButton } from "@/components/auth/logout-button";

const stats = [
  {
    title: "Total Sales",
    value: "$18,200",
    change: "+10.2%",
    trend: "up",
    description: "vs last month",
  },
  {
    title: "Operating Expenses",
    value: "$18,200",
    change: "-5.75%",
    trend: "down",
    description: "vs last month",
  },
  {
    title: "Gross Profit",
    value: "$18,200",
    change: "+8.65%",
    trend: "up",
    description: "vs last month",
  },
];

const sourceData = [
  { name: "Website", value: 5846, percentage: 65, color: "bg-primary" },
  { name: "Social Media", value: 2490, percentage: 20, color: "bg-blue-400" },
  { name: "Email", value: 1857, percentage: 10, color: "bg-violet-400" },
  { name: "Referral", value: 1245, percentage: 5, color: "bg-orange-400" },
];

const revenueData = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 15000 },
  { month: "April", revenue: 18000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 22000 },
  { month: "July", revenue: 19000 },
  { month: "Aug", revenue: 16000 },
  { month: "Sep", revenue: 14000 },
];

const salesData = [
  {
    id: 1,
    dealName: "Bargain Bonanza",
    company: "Amazon.com, Inc",
    companyLogo: "A",
    price: "$850,000.00",
    dateCreated: "Mon, 12 April 2025",
    owner: "Jenny Wilson",
    ownerAvatar: "JW",
    stage: "New",
  },
  {
    id: 2,
    dealName: "Discount Delights",
    company: "Xiaomi Corporation",
    companyLogo: "X",
    price: "$990,000.00",
    dateCreated: "Mon, 11 April 2025",
    owner: "Leslie Alexander",
    ownerAvatar: "LA",
    stage: "New",
  },
  {
    id: 3,
    dealName: "Price Slayers",
    company: "Apple, Inc",
    companyLogo: "A",
    price: "$450,000.00",
    dateCreated: "Mon, 11 April 2025",
    owner: "Cody Fisher",
    ownerAvatar: "CF",
    stage: "New",
  },
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="flex -space-x-2">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                AB
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                CD
              </AvatarFallback>
            </Avatar>
          </div>
          <LogoutButton variant="outline" size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="order">Order</TabsTrigger>
              <TabsTrigger value="report">Report</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-full ${
                                i <= 3 ? "bg-primary" : "bg-muted"
                              }`}
                              style={{ height: `${8 + i * 3}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          stat.trend === "up"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Revenue Forecast */}
          <Card className="lg:col-span-3 bg-background">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  Revenue Forecast
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="contacts">
                  <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contacts">Contacts</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-end gap-2">
                {revenueData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        index === 4
                          ? "bg-primary"
                          : "bg-muted hover:bg-muted-foreground/20"
                      }`}
                      style={{
                        height: `${(data.revenue / maxRevenue) * 180}px`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">
                    Sales revenue
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-xs text-muted-foreground">
                    Sales revenue
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <span className="text-xs text-muted-foreground">
                    Sales revenue
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Source */}
          <Card className="lg:col-span-2 bg-background">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-semibold">Source</CardTitle>
              </div>
              <Select defaultValue="contacts">
                <SelectTrigger className="w-[100px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <p className="text-3xl font-bold">12,450</p>
                  <p className="text-sm text-muted-foreground">Total source</p>
                </div>
                <div className="flex gap-1 flex-1">
                  {sourceData.map((source) => (
                    <div
                      key={source.name}
                      className={`h-8 rounded ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {sourceData.map((source) => (
                  <div key={source.name} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      {source.name === "Website" && (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                      {source.name === "Social Media" && (
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                      )}
                      {source.name === "Email" && (
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      )}
                      {source.name === "Referral" && (
                        <Users className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {source.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground w-10">
                      {source.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Table Data Sales
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search data"
                  className="pl-8 h-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="sm">
                Sort by
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Deal name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date created</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.dealName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-muted">
                            {sale.companyLogo}
                          </AvatarFallback>
                        </Avatar>
                        {sale.company}
                      </div>
                    </TableCell>
                    <TableCell>{sale.price}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {sale.dateCreated}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {sale.ownerAvatar}
                          </AvatarFallback>
                        </Avatar>
                        {sale.owner}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        {sale.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
